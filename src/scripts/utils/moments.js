import moment from 'moment';

const
    DATE_FORMAT = 'DD.MM.YYYY',
    TIME_FORMAT = 'HH:mm',
    TIME_FULL_FORMAT = 'HH:mm:ss.SSSS',
    DATETIME_FORMAT = 'DD.MM.YYYY HH:mm',
    DATETIME_FULL_FORMAT = 'DD.MM.YYYY HH:mm:ss.SSSS',

    JSON_DATE_FORMAT = 'YYYY-MM-DD',
    JSON_TIME_FORMAT = 'HH:mm:ss',
    JSON_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default {
    formatDate,
    formatDateJson,
    formatTime,
    formatTimeJson,
    formatDateTime,
    formatDateTimeJson,

    parseDate,
    parseTime,
    parseDateTime,

    fromDate,
    fromNow,
    getMonth,
    addSomethingToDate,
    duration,
    formateToMoment,
    getMonthName,
    now
};

function formatDate(date, format) {
    if (!date) {
        return '';
    }

    if (!moment.isMoment(date)) {
        date = parseDate(date);
    }
    return date ? date.format(format ? format : DATE_FORMAT) : '';
}

function getMonthName(monthName,year){
    let answer = moment().month(monthName).format('M');
    if(answer.length < 2){
        answer = '0'+ answer;
    }
    let countDaysInMonth = moment(year + '-' + answer, 'YYYY-MM').daysInMonth();
    String(countDaysInMonth);
    let firstDate = moment(year + '-' + answer + '-01').format('YYYY-MM-DD');
    let secondDate = moment(year + '-' + answer + '-' +  countDaysInMonth).format('YYYY-MM-DD');
    return {firstDate,secondDate};
}

function formateToMoment(first){
    if(first){
        return moment(first).format('YYYY-MM-DD');
    }
}

function duration(startDate,endDate){
    let answer = Math.abs(moment(startDate).diff(moment(endDate),'day'));
    return answer;
}

function addSomethingToDate(first,second) {
    if(second === 0){
        return moment(first).format('YYYY-MM-DD');
    } else{
        let answer = moment(first).add(second,'day');
        answer = moment(answer._d).format('YYYY-MM-DD');
        return answer;
    }
}

function getMonth(count){
    return moment.months(count);

}

function formatTime(time, format) {
    if (!time) {
        return '';
    }

    if (!moment.isMoment(time)) {
        time = parseTime(time);
    }
    return time ? time.format(format ? format : TIME_FORMAT) : '';
}

function formatDateTime(dateTime, format) {
    if (!dateTime) {
        return '';
    }

    if (!moment.isMoment(dateTime)) {
        dateTime = parseDateTime(dateTime);
    }
    return dateTime ? dateTime.format(format ? format : DATETIME_FORMAT) : '';
}

function formatDateJson(date) {
    return formatDate(date, JSON_DATE_FORMAT);
}

function formatTimeJson(time) {
    return formatTime(time, JSON_TIME_FORMAT);
}

function formatDateTimeJson(date) {
    return formatDateTime(date, JSON_DATETIME_FORMAT);
}

function parseDate(dateStr) {
    if (dateStr) {
        if (moment.isDate(dateStr)) {
            return fromDate(dateStr);
        }
        return moment(dateStr, [moment.ISO_8601, DATE_FORMAT]);
    }
    return null;
}
function parseTime(timeStr) {
    if (timeStr) {
        if (moment.isDate(timeStr)) {
            return fromDate(timeStr);
        }
        return moment(timeStr, [moment.ISO_8601, TIME_FULL_FORMAT]);
    }
    return null;
}

function parseDateTime(dateTimeStr) {
    if (dateTimeStr) {
        if (moment.isDate(dateTimeStr)) {
            return fromDate(dateTimeStr);
        }
        return moment(dateTimeStr, [moment.ISO_8601, DATETIME_FULL_FORMAT]);
    }
    return null;
}

function fromDate(date) {
    if (date) {
        return moment(date);
    }
}

function fromNow(value) {
    if (value) {
        return moment(value).fromNow();
    }
}

function now() {
    return moment();
}