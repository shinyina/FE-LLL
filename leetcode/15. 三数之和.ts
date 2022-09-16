function threeSum(nums: number[]): number[][] {
    var res: number[][] = []
    nums.sort((a, b) => {
        return a - b
    })
    var l = nums.length
    var k: number, i: number, j: number
    for (k = 0; k < l; k++) {
        if (nums[k] > 0) break
        if (nums[k] == nums[k - 1]) continue
        j = l-1
        i=k+1
        while(i<j){
           var sum:number=nums[i]+nums[k]+nums[j]
            if(sum<0||nums[i]==nums[i-1]) {i++;continue}
            if(sum>0||nums[j]==nums[j+1]){j--;continue}
            if(sum==0){
                res.push([nums[k],nums[i],nums[j]])
            }
        }
    }
    return res
};