
// class TreeNode {
//     val: number
//     left: TreeNode | null
//     right: TreeNode | null
//     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
//         this.val = (val === undefined ? 0 : val)
//         this.left = (left === undefined ? null : left)
//         this.right = (right === undefined ? null : right)
//     }
// }


function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) return false;//没有这个判断会报错
    if (targetSum - root.val === 0 && root.left == null && root.right == null) return true
    var flag: boolean = false
    function dfs(cnt: number, node: TreeNode | null): boolean {
        if (node === null) return false
        cnt -= node.val
        if (node.left == null && node.right == null && cnt == 0) { flag = true; return true; }
        if (node.left == null && node.right == null && cnt != 0) { return false; }
        if (node.left)
            if (dfs(cnt, node.left)) return true
        if (node.right)
            if (dfs(cnt, node.right)) return true
            return false
    }
    if (root.left)
        dfs(targetSum - root.val, root.left)
    if (root.right)
        dfs(targetSum - root.val, root.right)
    return flag
};