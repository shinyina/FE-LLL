/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    var res = []
    var used = []
    var len = nums.length
    function dfs(path) {
        if (path.length === len) {
            res.push(path.slice())
            return ;
        }
        for (const num of nums) {
            console.log(num);
            if (used[num]) continue;
            used[num] = true
            path.push(num)
            dfs(path)
            path.pop()
            used[num] = false
        }
    }
    dfs([])
    return res
};
console.log(permute([1,2,3]));