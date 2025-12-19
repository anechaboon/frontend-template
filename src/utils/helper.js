export function enumToOptions(enumObj) {
    return Object.entries(enumObj).map(([key, value]) => ({
        title: value,
        value: key,
    }))
}
