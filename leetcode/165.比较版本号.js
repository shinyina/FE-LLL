/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
    v1 = version1.split('.')
    v2 = version2.split('.')
    v1l = v1.length
    v2l = v2.length
    max = Math.max(v1l, v2l)
    for (let i = 0; i < max; i++) {
        if (v1[i] == undefined)
            v1[i] = 0
        if (v2[i] == undefined)
            v2[i] = 0
        v1[i]=Number(v1[i])
        v2[i]=Number(v2[i])
        if(v1[i]>v2[i])
        return 1
        if(v1[i]<v2[i])
        return -1
    }
    return 0
};