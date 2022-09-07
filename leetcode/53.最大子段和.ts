function maxSubArray(nums: number[]): number {
    var sum: number = 0, ans: number = nums[0];
    for (const num of nums) {
        if (sum <= 0) {
            sum = num
            ans = Math.max(ans, num)
        }
        else {
            sum += num
            ans = Math.max(ans, sum)
        }
    }
    return ans;
};