var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
userType=(data)=>{
    var keys=Object.keys(data)
    if(keys[0]!='name') return false
    if(keys[1]!='email') return false
    if(keys[2]!='password') return false
    if(!reg.test(data.email)) return false
    if(!data.password) return false
    return true
}

module.exports=userType