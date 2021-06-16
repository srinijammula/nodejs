const exp=require("express")
const app=exp();

//importing
const userApi=require("./apis/user-api")
const productApi=require("./apis/product-api")


app.use("/user",userApi)
app.use("/product",productApi)


app.use((req,res)=>{
    res.send({message:`Path ${req.url} is invalid`})
})

app.use((err,req,res,next)=>{
    res.send({message:`${err.message}`})
})

const port=3000
app.listen(port,()=>console.log(`Server can hear you on ${port}....`))

