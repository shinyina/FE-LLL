
function deepClone1(obj) {
  let cloneObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (typeof obj[key] == 'object' && obj[key] != null && obj[key]) {
      cloneObj[key] = deepClone1(obj[key])
    } else {
      cloneObj[key] = obj[key]
    }
  }
  return cloneObj
}

let obj1 = [1, 4, 2, 5,[4,3]]
let obj2 = deepClone1(obj1)

console.log(obj2);