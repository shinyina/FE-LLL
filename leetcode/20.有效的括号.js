/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    var stack = []
    l = s.length
    if (l % 2 != 0)
        return false
    for (let i = 0; i < l; i++) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{')
            stack.unshift(s[i])
        else {
            if (s[i] === ')' && stack[0] === '(') {
                stack.shift()
                continue
            }
            if (s[i] === ')' && stack[0] != '(')
                return false
            if (s[i] === ']' && stack[0] === '[') {
                stack.shift()
                continue
            }
            if (s[i] === ']' && stack[0] != '[')
                return false
            if (s[i] === '}' && stack[0] === '{') {
                stack.shift()
                continue
            }
            if (s[i] === '}' && stack[0] != '{')
                return false
        }
    }
    if (stack.length!=0)
        return false
    return true
};