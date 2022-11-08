function cloneDeep(obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj == 'object')
        for (key in obj) {
            if (obj[key] && typeof obj[key] == 'object')
                objClone[key] = cloneDeep(obj[key])
            else
                objClone[key] = obj[key]
        }
    return objClone
}
