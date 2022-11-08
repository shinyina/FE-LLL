const data = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1
            }
        ]
    },
    {
        id: 1,
        text: '节点2',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点2_2',
                parentId: 1
            }
        ]
    }
]
function toList(data) {
    let arr = []
    const dfs = (tree) => {
        for (let x of tree) {
            for (let y in x) {
                if (y == 'children')
                    dfs(x[y])
            }
            delete x['children']
            arr.push(x)
        }

    }
    dfs(data)
    console.log(arr);
}
toList(data)