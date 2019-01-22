(function (global) {
    'use strict';

    var _ = require('lodash');

    /**
     * Вспомогательные методы для запросов к серверу
     * @type {Http}
     */
    module.exports.http = new Http();

    module.exports.unwrapTextResponse = function (response) {
        // Если запрос завершился ошибкой, пытаемся разобрать ее текст
        if (!response.ok) {
            return unwrapErrorResponse(response);
        }

        return response.text();
    };

    module.exports.unwrapJsonResponse = function (response) {
        // Если запрос завершился ошибкой, пытаемся разобрать ее текст
        if (!response.ok) {
            return unwrapErrorResponse(response);
        }

        return response.json();
    };

    /**
     * Создать функцию-преобразователь результата запроса к серверу в локальные объекты
     *
     * @param {Function} [Constructor] Функция-конструктор
     * @returns {Function}
     */
    module.exports.prepareMapper = function (Constructor) {
        return function (data) {
            if (Array.isArray(data)) {
                return data.map(function (data) {
                    return Constructor ? new Constructor(data) : data;
                });
            } else {
                return Constructor ? new Constructor(data) : data;
            }
        };
    };

    module.exports.serializeQueryFilter = function (filter) {
        filter = filter || {};

        var queryFilter = '';
        Object.keys(filter).forEach(function (key) {
            if (filter[key] !== undefined) {
                if (_.isBoolean(filter[key]) && filter[key]) {
                    queryFilter = queryFilter + '&' + encodeURIComponent(key);
                } else if (!_.isEmpty(filter[key])) {
                    queryFilter = queryFilter + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(filter[key]);
                }
            }
        });

        return queryFilter;
    };

    module.exports.serializeQuerySort = function (sort) {
        sort = sort || {};

        var querySort = '';
        if (sort.name) {
            querySort = '&sort=' + (sort.dir > 0 ? '' : '-') + sort.name;
        }
        return querySort;
    };

    module.exports.serializeQueryPagination = function (pagination) {
        var queryPagination = '';
        if (pagination) {
            queryPagination += '&pageSize=' + (pagination.pageSize || 100);
            queryPagination += '&skip=' + (pagination.skip || 0);
        }

        return queryPagination;
    };

    function Http() {}

    /**
     * GET запрос
     *
     * @param {String} url         Адрес
     * @param {Object} [options]   Настройки запроса
     * @promise {*}
     */
    Http.prototype.get = function (url,typeToken, options) {
        return fetch('get', url, options, typeToken);
    };

    /**
     * POST запрос
     *
     * @param {String} url      Адрес
     * @param {Object} [options]   Настройки запроса
     * @promise {*}
     */
    Http.prototype.post = function (url, options, typeToken) {
        return fetch('post', url, options, typeToken,);
    };

    /**
     * PUT запрос
     *
     * @param {String} url      Адрес
     * @param {Object} [options]   Настройки запроса
     * @promise {*}
     */
    Http.prototype.put = function (url, options) {
        return fetch('put', url, options, options.token);
    };

    /**
     * DELETE запрос
     *
     * @param {String} url      Адрес
     * @param {Object} [options]   Настройки запроса
     * @promise {*}
     */
    Http.prototype.delete = function (url, options) {
        return fetch('delete', url, options);
    };

    /**
     * Обертка вокруг HTML fetch, для установки обязательных заголовков
     *
     * @param {String} method - HTTP метод
     * @param {String} url - Адрес или запрос
     * @param {Object} [options] - Настройки запроса
     * @promise {*}
     */
    function fetch(method, url, options = {}, typeToken) {
        // Адрес
        url = formatServerUrl(url, options.query);
        
        // Параметры запроса
        var fetchOptions = {
            method: method,
            headers: new global.Headers()
        };

        // Тело запроса
        if (options.body) {
            var body = options.body;
            if (_.isObject(body)) {
                // Если есть функция, подготавливающая объект к запросу, то заменим его на результат ее вызова
                if (_.isFunction(body.prepareForRequest)) {
                    body = body.prepareForRequest();
                }
                body = JSON.stringify(body);
            }
            fetchOptions.body = body;
        }

        // Заголовки
        fetchOptions.headers.set('Accept', 'application/json');
        fetchOptions.headers.set('Content-Type', 'application/json; charset=utf-8');
        // Аутентификация
        return global.fetch(url, fetchOptions);
    }

    function formatServerUrl(uriPart, params) {
        // Адрес
        uriPart = uriPart || '';

        // Параметры
        var paramsText = '';
        if (_.isObject(params)) {
            Object.keys(params).forEach(function (key) {
                paramsText += (paramsText.length > 0) ? '&' : '';

                paramsText += key + '=' + params[key];
            });
        }

        if (!_.isEmpty(paramsText)) {
            uriPart += '?' + paramsText;
        }

        // Если передали только часть URL, то объединяем с адресом сервера
        if (uriPart.trim().search(/^http/i) < 0) {
            if (uriPart[0] !== '/') {
                uriPart = '/' + uriPart;
            }
            return global.SERVER_URL + '/api' + uriPart;
        } else {
            // Иначе считаем что URI уже был подготовлен
            return uriPart;
        }
    }

    function unwrapErrorResponse(response) {
        // Если код ошибки - 500, то в теле должно быть описание ошибки в формате JSON ...
        if (response.status === 500) {
            return response.json()
                .then((error) => {
                    throw new Error(error.message);
                });
        } else {
            // ... иначе пытаемся прочитать ее как текст
            return response.text()
                .then((error) => {
                    if (!_.isEmpty(error)) {
                        throw new Error(error);
                    }

                    // Если в теле ответа было пусто, то используем описание статуса ответа
                    throw new Error(response.statusText);
                });
        }
    }
})(window);