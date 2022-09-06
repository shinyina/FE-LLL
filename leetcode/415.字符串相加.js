/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    var str = ''
    var temp = 0
    var l1 = num1.length
    var l2 = num2.length
    max = Math.max(l1, l2)
    for (let i = 0; i < max; i++) {
        if (l1 != max) {

            if (l1 + i == max)
                break
            num1 = '0' + num1
        }
        if (l2 != max) {

            if (l2 + i == max)
                break
            num2 = '0' + num2
        }
    }
    for (let i = max - 1; i >= 0; i--) {
        if (Number(num1[i]) + Number(num2[i]) + temp < 10) {
            str = String(Number(num1[i]) + Number(num2[i]) + temp) + str
            temp = 0
        }
        else {
            str = String((Number(num1[i]) + Number(num2[i])+temp ) % 10) + str
            temp = 1
        }
    }
    if(temp==1)
    str='1'+str
    return str
};