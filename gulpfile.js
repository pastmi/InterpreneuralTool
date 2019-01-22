(function() {
    'use strict';

    const gulp = require('gulp');
    const gulpSass = require('gulp-sass');
    const gulpConcat = require('gulp-concat');
    const gulpUglify = require('gulp-uglify');
    const gulpReplace = require('gulp-replace');
    const gulpStreamify = require('gulp-streamify');
    const gulpUtil = require('gulp-util');
    const fsExtra = require('fs-extra');
    const vinylSourceStream = require('vinyl-source-stream');
    const browserify = require('browserify');
    const browserifyHmr = require('browserify-hmr');
    const watchify = require('watchify');
    const babelify = require('babelify');
    const vueify = require('vueify');
    const envify = require('envify/custom');
    const yargsArgv = require('yargs').argv;
    const browserSync = require('browser-sync').create();

    const NODE_ENV = (process.env.NODE_ENV || '').trim() || 'development';
    const BUILD_NUMBER = (process.env.BUILD_NUMBER || '').trim() || 'dev';

    const PATH = {
        src: {
            DIR_ROOT: './src',
            DIR_SCRIPTS: './src/scripts',
            DIR_IMAGES: './src/img',
            IMAGES_GLOB: './src/img/**/*.*',
            STYLES_GLOB: './src/styles/**/*.scss',
            manager: {
                HTML: './src/index.html',
                JS: './src/scripts/app.js',
                STYLES: './src/styles/index.scss'
            },
        },
        build: {
            DIR_ROOT: './build',
            DIR_SCRIPTS: './build/scripts',
            DIR_IMAGES: './build/img',
            DIR_STYLES: './build/styles',
            DIR_VENDOR: './build/vendor/**/*.*',
            manager: {
                JS: 'app.js',
                STYLES: 'index.css',
                COMPONENT_STYLES: './build/styles/index.css'
            },
        }
    };

    const CONFIG = {
        isDebug: false,
        serverUrl: '',
        version: '',
        browserSync: {
            port: 13091,
            open: false,
            server: {
                baseDir: PATH.build.DIR_ROOT
            }
        }
    };

    gulp.task('default', function() {
        if (NODE_ENV === 'production') {
            CONFIG.isDebug = false;
            CONFIG.serverUrl = '';
            CONFIG.version = yargsArgv.ver || BUILD_NUMBER;

            return gulp.start('production');
        } else {
            CONFIG.isDebug = true;
            CONFIG.serverUrl = 'http://localhost:13090';
            CONFIG.version = 'dev';

            return gulp.start('watch');
        }
    });

    /**
     * Полная сборка проекта с минификацией.
     */
    gulp.task('production', [
        'managerBuild',

    ]);

    /**
     * Дебаг сборка проекта с отслеживанием изменений
     */
    gulp.task('watch', [
        'managerWatch',
    ], function() {
        browserSync.init(CONFIG.browserSync);
    });




    /**
     * Подпроект "Приложение менеджера"
     */
    gulp.task('managerBuild', [
        'managerHTML',
        'managerJS',
        'managerStyles',
        'commonVendor',
        'commonImages'
    ]);

    gulp.task('managerHTML', function() {
        return gulp.src(PATH.src.manager.HTML)
            .pipe(gulpReplace('@@gulpServerUrl', CONFIG.serverUrl))
            .pipe(gulpReplace('@@gulpVersion', CONFIG.version))
            .pipe(gulpReplace('@@gulpBuild', BUILD_NUMBER))
            .pipe(gulp.dest(PATH.build.DIR_ROOT))
            .pipe(browserSync.stream());
    });
    gulp.task('commonImages', function() {
        return gulp.src(PATH.src.IMAGES_GLOB)
            .pipe(gulp.dest(PATH.build.DIR_IMAGES));

    });

    gulp.task('managerJS', function() {
        const bundler = createBrowserify(PATH.src.manager.JS, PATH.build.manager.COMPONENT_STYLES);
        return bundler
            .transform(envify({ NODE_ENV }), { global: true })
            .bundle()
            .on('error', mapError)
            .pipe(vinylSourceStream(PATH.build.manager.JS))
            .pipe(gulpStreamify(gulpUglify()))
            .pipe(gulp.dest(PATH.build.DIR_SCRIPTS));
    });

    gulp.task('managerStyles', function() {
        return gulp.src(PATH.src.manager.STYLES)
            .pipe(gulpSass({ includePaths: 'node_modules' }))
            .on('error', mapError)
            .pipe(gulpConcat(PATH.build.manager.STYLES))
            .pipe(gulp.dest(PATH.build.DIR_STYLES))
            .pipe(browserSync.stream());
    });
    gulp.task('commonVendor', function() {
        // Убедимся в наличии папок
        // fsExtra.ensureDir('./src/vendor/');
        // fsExtra.ensureDir('./build/vendor/');

        // keen-ui
        fsExtra.ensureDir('./build/vendor/keen-ui/');
        fsExtra.copy('./node_modules/keen-ui/dist/keen-ui.min.css', './build/vendor/keen-ui/keen-ui.css', {});
    });

    gulp.task('managerWatch', [
        'managerHTML',
        'managerStyles',
        'commonVendor',
        'commonImages'
    ], function() {
        gulp.watch(PATH.src.manager.HTML, ['managerHTML']);
        gulp.watch(PATH.src.STYLES_GLOB, ['managerStyles']);

        const watcher = watchify(
            createBrowserify(PATH.src.manager.JS, PATH.build.manager.COMPONENT_STYLES)
        );

        function rebundle() {
            return watcher
                .bundle()
                .on('error', mapError)
                .pipe(vinylSourceStream(PATH.build.manager.JS))
                .pipe(gulp.dest(PATH.build.DIR_SCRIPTS))
                .pipe(browserSync.stream());
        }

        watcher.on('update', function() {
            rebundle();
            console.log('[' + new Date() + '] Updated');
        });

        return rebundle();
    });



    /**
     * Создание browserify бандлера с необходимыми параметрами
     * @param appEntry
     * @param cssBundle
     * @returns {*}
     */
    function createBrowserify(appEntry, cssBundle) {
        const params = {
            entries: [appEntry],
            transform: [
                vueify,
                babelify.configure({
                    ignore: /node_modules/,
                    presets: ['es2015', 'stage-2']
                })
            ],
            require: [
                /*'jszip'*/
            ]
        };

        if (CONFIG.isDebug) {
            params.debug = true;
            params.cache = {};
            params.packageCache = {};
            params.fullPaths = true;
        }

        let bundler = browserify(params)
            .plugin('vueify/plugins/extract-css', { out: cssBundle });

        if (false && CONFIG.isDebug) {
            bundler = bundler
                .plugin(browserifyHmr);
        }

        return bundler;
    }

    /**
     * Вывести ошибку в консоль
     * @param err
     */
    function mapError(err) {
        if (err.fileName) {
            // regular error
            gulpUtil.log(
                gulpUtil.colors.red(err.name) + ': ' +
                gulpUtil.colors.yellow(err.fileName.replace(__dirname + '/src/js/', '')) + ': ' +
                'Line ' + gulpUtil.colors.magenta(err.lineNumber) + ' & ' + 'Column ' + gulpUtil.colors.magenta(err.columnNumber || err.column) +
                ': ' + gulpUtil.colors.blue(err.description));
        } else {
            // browserify error..
            gulpUtil.log(
                gulpUtil.colors.red(err.name) + ': ' + gulpUtil.colors.yellow(err.message));
        }

        if (this) {
            this.emit('end');
        }
    }
})();