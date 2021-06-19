

const exp=require("express")
const userApi=exp.Router();
const mc=require("mongodb").MongoClient;
const jwt = require("jsonwebtoken")
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")

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
userApi.get('/getusers',expressErrorHandler(async(req,res,next)=>{
    let userList=await userCollectionsObj.find().toArray()
    res.send({message:userList})
}))

// get http://localhost:3000/user/getusers/<username>
userApi.get('/getusers/:username',expressErrorHandler(async(req,res,next)=>{

    //read username from url
    let un=req.params.username;

    let userObj= await userCollectionsObj.findOne({username:un})
    if(userObj===null){
        res.send({message:"User not found"})
    }
    else{
        res.send({message: userObj})
    }

}))


//create user
userApi.post("/createuser",expressErrorHandler(async(req,res,next)=>{
    let newUser=req.body;
    //search for existing users
    let user=await userCollectionsObj.findOne({username:newUser.username})
    if(user!=null){
        res.send({message:"User already existed"})
    }
    else{
        //hashing
        let hashed=await bcryptjs.hash(newUser.password,7)
        newUser.password = hashed;
        await userCollectionsObj.insertOne(newUser)
        res.send({message:"User created"})
    }
}))


//http://localhost:3000/user/updateuser/<username>
userApi.put("/updateuser/:username", expressErrorHandler(async(req, res, next) => {

    //get modified user
    let modifiedUser = req.body;
    
    //update
    await userCollectionsObj.updateOne({ username: modifiedUser.username }, {$set:{ ...modifiedUser }})
    let user = await userCollectionsObj.findOne({ username: modifiedUser.username })
    console.log(user)
    //send res
    res.send({ message: "User modified" })

}))

//delete
userApi.delete("/deleteuser/:username", expressErrorHandler(async (req, res) => {

    //get username from url
    let un = req.params.username;
    //find the user
    let user = await userCollectionsObj.findOne({ username: un })

    if (user === null) {
        res.send({ message: "User not found" })
    }
    else {
        await userCollectionsObj.deleteOne({ username: un })
        res.send({ message: "user removed" })
    }
}))

//user Login
userApi.post('/login',expressErrorHandler(async(req,res)=>{
    let credentials=req.body;
    let user=await userCollectionsObj.findOne({username:credentials.username})
    if(user==null){
        res.send({message:"Invalid username"})
    }
    else{
        let result= await bcryptjs.compare(credentials.password,user.password)
        if(result===false){
            res.send({message:"Invalid pass"})
        }
        else{
            //create token
            let tokened=jwt.sign({username:credentials.username},'abcdef',{expiresIn:100})
            res.send({message:"Login successful",token:tokened})
        }
    }
}))


//export module
module.exports=userApi