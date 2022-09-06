/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    var l = 0;
    var r = 0;
    var max = 0
    var set = new Set();
    while (l <= r && r < s.length) {
        if (!set.has(s[r])) {
            max = Math.max(r - l + 1, max)
            set.add(s[r])
            r++
        }
        else {
            set.delete(s[l])
            l++
        }
    }
    return max
};