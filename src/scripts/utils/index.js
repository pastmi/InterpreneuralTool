import base64 from './base64';
import collections from './collections';
import storage from './storage';
import moments from './moments';
import math from './math';

const common = {
    canNavigateBack,

    keyboardEventToChar(event) {
        if (event.key !== undefined) {
            // Берем только клавиши с кодом единичной длины - буквы, цифры и спец. символы
            if (event.key.length === 1) {
                return event.key;
            } else {
                console.warn(`Пропущено нажатие: ${event.key}`);
            }
        } else if (event.keyCode > 0) {
            return String.fromCharCode(event.keyCode);
        }
        return '';
    },

    navigateBack(router) {
        if (canNavigateBack(router)) {
            router.back();
        }
    }
};

export {
    base64,
    common,
    collections,
    storage,
    moments,
    math
};
export default common;

function canNavigateBack(router) {
    return router.currentRoute &&
        router.currentRoute.path !== '/' &&
        router.currentRoute.path !== '/dashboard';
}
