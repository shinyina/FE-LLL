function climbStairs(n: number): number {
    var n1: number = 1, n2: number = 2, cnt: number = 0
    if (n === 1)
        return 1
    if (n === 2)
        return 2
    for(var i:number=3;i<=n;i++){
        cnt=n1+n2
        n1=n2
        n2=cnt
    }
    return cnt
};