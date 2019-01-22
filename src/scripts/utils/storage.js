const LS_TSD_CONFIG = 'tsd_config';
const LS_PASSWORD = 'password';
const LS_STORE_KEY = 'store_key';
const LS_TSD_STORE_KEY_FOR_FILTER = 'store_key_for_filter';
const LS_CASHIER_REMAINS_KEYBOARD_STATUS = 'cashier:remains:keyboard_status';
const LS_SELECTED_SCAN_DOCUMENT_TYPE = 'scan_document_type';

export default {
    get tsdConfigKey() {
        return Number(localStorage.getItem(LS_TSD_CONFIG));
    },

    set tsdConfigKey(value) {
        localStorage.setItem(LS_TSD_CONFIG, value);
    },

    get storeKeyForFilter() {
        return Number(localStorage.getItem(LS_TSD_STORE_KEY_FOR_FILTER));
    },

    set storeKeyForFilter(value) {
        localStorage.setItem(LS_TSD_STORE_KEY_FOR_FILTER, value);
    },

    get password() {
        return localStorage.getItem(LS_PASSWORD);
    },
    set password(value) {
        localStorage.setItem(LS_PASSWORD, value);
    },

    get storeKey(){
        return parseInt(localStorage.getItem(LS_STORE_KEY));
    },
    set storeKey(value) {
        localStorage.setItem(LS_STORE_KEY, value);
    },

    get cashierRemainsKeyboardStatus() {
        return Boolean(localStorage.getItem(LS_CASHIER_REMAINS_KEYBOARD_STATUS));
    },
    set cashierRemainsKeyboardStatus(value) {
        localStorage.setItem(LS_CASHIER_REMAINS_KEYBOARD_STATUS, value ? '1' : '');
    },

    get scanDocumentType() {
        return parseInt(localStorage.getItem(LS_SELECTED_SCAN_DOCUMENT_TYPE));
    },
    set scanDocumentType(value){
        localStorage.setItem(LS_SELECTED_SCAN_DOCUMENT_TYPE, value);
    }
};