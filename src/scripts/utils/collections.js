export default {
    getById,
    setById,
    getByProp,
    removeById
};

function getById(array, id) {
    const index = _indexById(array, id);
    if (index >= 0) {
        return array[index];
    }
    return null;
}

function setById(array, id, item) {
    if (!(id > 0)) {
        array.push(item);
    }

    const index = _indexById(array, id);
    if (index >= 0) {
        array.splice(index, 1, item);
    } else {
        array.push(item);
    }
}

function getByProp(array, prop, value) {
    const index = _indexOfProp(array, prop, value);
    if (index >= 0) {
        return array[index];
    }
    return null;
}

function removeById(array, id) {
    const index = _indexById(array, id);
    if (index >= 0) {
        array.splice(index, 1);
    }
}

function _indexById(array, id) {
    for (let [index, item] of array.entries()) {
        if (item.id === id) {
            return index;
        }
    }

    return -1;
}

function _indexOfProp(array, prop, value) {
    for (let [index, item] of array.entries()) {
        if (item[prop] === value) {
            return index;
        }
    }

    return -1;
}