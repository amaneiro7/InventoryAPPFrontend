export function useIsExist (data, field, value) {
    if ((field === 'serial' || field === 'activo') && value !== "") {
        return data.some(item => String(item[field]) === String(value))
    } 
    return false
}