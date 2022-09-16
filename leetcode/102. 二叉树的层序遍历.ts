class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}


function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) return []
    var ans: number[][] = []
    const dfs = (cnt: number, root: TreeNode): void => {
        ans[cnt]=[]
        if (root.left === null && root.right === null) return
        ans[cnt].push(root.val)
        if (root.left != null)
            dfs(cnt++, root.left)
        if (root.right != null)
            dfs(cnt++, root.right)
    }
    dfs(0,root)
    return ans
};