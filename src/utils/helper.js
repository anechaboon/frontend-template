export function enumToOptions(enumObj) {
    return Object.entries(enumObj).map(([key, value]) => ({
        title: value,
        value: key,
    }))
}

export function convertObjectToOptions(obj, indexTitle = 'title', indexValue = 'id') {
    return Object.entries(obj).map(([key, value]) => ({
        title: value[indexTitle],
        value: value[indexValue],
    }))
}
