export const getLocalStorageItem = (itemKey: string): any => {
    const item = localStorage.getItem(itemKey);
    return item?
        JSON.parse(item)
        : null
}

export const setLocalStorageItem = (itemKey: string, itemValue: any): void => {
    const value = JSON.stringify(itemValue)
    localStorage.setItem(itemKey, value);
}