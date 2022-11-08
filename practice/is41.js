let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 0 },
]

function get_tree(arr) {
    const list = []
  
    arr.forEach(element => {
      const chiildren_arr = arr.filter(ele => {
        return element.id === ele.pid
      })
  
      if (chiildren_arr.length > 0) {
        element.chiildren = chiildren_arr
      }
  
      if (element.pid === 0) {
        list.push(element)
      }
    });
  
    return list
  }
  console.log(get_tree(arr));