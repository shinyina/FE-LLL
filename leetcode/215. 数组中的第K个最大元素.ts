function findKthLargest(nums: number[], k: number): number {
    nums.sort((a:number,b:number)=>{
        return b-a
    })
    return nums[k-1]
};