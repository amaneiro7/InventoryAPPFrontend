export function useIsExist (data, field, value) {
    if ((field === 'serial' || field === 'activo') && value !== "") {
        return data.some(item => String(item[field]).toLowerCase() === String(value).toLowerCase())
    } 
    return false
}