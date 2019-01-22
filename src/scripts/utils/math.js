function roundTo(number, roundToValue) {
    roundToValue = roundToValue || 1;
    roundToValue = 1 / roundToValue;
    return Math.round(number * roundToValue) / roundToValue;
}
function roundCurrency(value) {
    return roundTo(value + 0.0001, 0.01);
}

export default {
    roundTo,
    roundCurrency
};
