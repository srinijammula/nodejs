const exp=require("express")
const userApi=exp.Router();
const mc=require("mongodb").MongoClient;
//const expressErrorHandler=require("express-async-handler")
//const bcryptjs=require("bcryptjs")

userApi.use(exp.json())

const databaseUrl="mongodb+srv://new1:cupnamdey123@srini.dvcom.mongodb.net/db1?retryWrites=true&w=majority"

let databaseObj;
let userCollectionsObj;

mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err){
        console.log("error in database connection",err)
    }
    else{
        databaseObj=client.db("db1");
        userCollectionsObj=databaseObj.collection("db1collection")
        console.log("Database connection is success")
    }
})


//get http://localhost:3000/user/getusers
userApi.get('/getusers',(req,res,next)=>{
    userCollectionsObj.find().toArray((err,usersList)=>{
        if(err){
            console.log("error in reading the users list ",err)
            res.send({message: err.message})
        }
        else{
            res.send({message:usersList})
        }
    })
})

// get http://localhost:3000/user/getusers/<username>
 userApi.get('/getusers/:username',(req,res,next)=>{

     //read username from url
     let un=req.params.username;

     userCollectionsObj.findOne({username:un},(err,userObj)=>{
         if(err){
             console.log("error in reading the user ",err)
             res.send({message: err.message})
         }
         if(userObj===null){
             res.send({message:"User not found"})
         }
         else{
             res.send({message: userObj})
         }
     })
 })

//create user
userApi.post("/createuser",(req,res,next)=>{
    let newUser=req.body;
    //check user in db with given one
    userCollectionsObj.findOne({username:newUser.username},(err,userObj)=>{
        if(err){
            console.log("error in creating the user ",err)
            res.send({message: err.message})
        }
        if(userObj===null){
            userCollectionsObj.insertOne(newUser,(err,success)=>{
                if(err){
                    console.log("error in inserting the user ",err)
                    res.send({message: err.message})
                }
                else{
                    res.send({message:"New user created"})
                }
            })
        }
        else{
            res.send({message:"user already existed"})
        }
    })
})


//http://localhost:3000/user/updateuser/<username>
userApi.put("/updateuser/:username", (req, res, next) => {

    //get modified user
    let modifiedUser = req.body;

    //update
    userCollectionsObj.updateOne({ username: modifiedUser.username }, {
        $set: { ...modifiedUser }
    }, (err, success) => {

        if (err) {
            console.log("err in updating users data", err)
            res.send({ message: err.message })
        }
        else {
            res.send({ message: "User updated" })
        }
    })

})

//delete
userApi.delete("/deleteuser/:username",(req,res,next)=>{
    let un= req.params.username;
    userCollectionsObj.findOne({username:un},(err,data)=>{
        if (err) {
            console.log("err in deleting user", err)
            res.send({ message: err.message })
        }
        if(data===null){
            res.send({ message: "User not existed" })
        }
        else{
            userCollectionsObj.deleteOne({ username: un })
           res.send({ message: "user removed" })
        }
    })

})



//export module
module.exports=userApi