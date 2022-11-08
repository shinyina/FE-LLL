message={
    error:(res,value)=>{
        res.status(400).json({
            code:400,
            msg:value
        })
    },
    data:(res,data)=>{
        res.send({
            code:200,
            data
        })
    }
}

module.exports=message