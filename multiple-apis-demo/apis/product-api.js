const exp=require("express")
const productApi=exp.Router();

//route handling
productApi.get('/getProducts',(req,res)=>{
    res.send({meassage:"Your Product api is executing..."})
})

//export module
module.exports=productApi