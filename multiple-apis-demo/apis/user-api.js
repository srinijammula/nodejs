const exp=require("express")
const userApi=exp.Router();

//route handling
userApi.get('/getusers',(req,res)=>{
    res.send({meassage:"Your user api is executing..."})
})

//export module
module.exports=userApi