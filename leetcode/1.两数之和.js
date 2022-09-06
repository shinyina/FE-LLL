/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    var map = {}
    l = nums.length
    for (let i = 0; i < l; i++) {
        if (target - nums[i] in map)
            return [ map[target - nums[i]],i]
        else
            map[nums[i]] = i;
    }
};