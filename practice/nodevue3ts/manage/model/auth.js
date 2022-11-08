
authType=(data)=>{
    var keys=Object.keys(data)
    if(keys[0]!='email') return false
    if(keys[1]!='password') return false
    if(!data.password) return false
    return true
}

module.exports=authType