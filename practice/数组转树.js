// 例如将 input 转成output的形式
let input = [
    {
        id: 1, val: '学校', parentId: null
    }, {
        id: 2, val: '班级1', parentId: 1
    }, {
        id: 3, val: '班级2', parentId: 1
    }, {
        id: 4, val: '学生1', parentId: 2
    }, {
        id: 5, val: '学生2', parentId: 2
    }, {
        id: 6, val: '学生3', parentId: 3
    },
]

function arrayToTree(input) {
    let result
    input.forEach(obj => {
        children = input.filter((item) => {
            if (item.parentId == obj.id)
                return item
        })
        if (children.length>0)
            obj.children = children
        if (obj.parentId == null)
            result = obj
    })
    return result
}

console.log(arrayToTree(input))