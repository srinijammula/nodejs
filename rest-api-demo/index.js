const exp=require("express")
const app=exp();
const mc=require("mongodb").MongoClient;

app.use(exp.json())

let users=[];

const databaseUrl="mongodb+srv://new1:cupnamdey123@srini.dvcom.mongodb.net/db1?retryWrites=true&w=majority"

//get http://localhost:3000/users
app.get('/users',(req,res)=>{
    if(users.length === 0){
         res.send({message:"User list is empty"})
     }
     else{
         res.send({message:users})
  }
})

// http://localhost:3000/user/<id>
app.get("/user/:id",(req,res)=>{
    let uid = (+req.params.id);
    let matchedUsers=users.filter(userObj=>userObj.id===uid)
    if(matchedUsers.length===0){
        res.send({message:`User with id ${uid} is not existing `})
    }
    else{
        res.send({message : matchedUsers[0]})
    }
})

//create user
// http://localhost:3000/createuser
app.post('/createuser',(req,res)=>{
    let newUser=req.body;


    //search for user
    let matchedUsers=users.filter(userObj=>userObj.id===newUser.id)

    //if user not existed
    if(matchedUsers.length===0){
        users=[...users,newUser]
        res.send({message:"New user created"})
    }
    else{
        res.send({message:`user already existed with id ${newUser.id}`})
    }
})


//update user
// http://localhost:3000/updateuser/<id>
app.put('/updateuser/:id',(req,res)=>{
    let userObjToUpdate= req.body;
    let ind=users.findIndex(userObj=>userObj.id===userObjToUpdate.id)

    if(ind==-1){
        res.send({message:"No user existed to modify"})
    }
    else{
        users.splice(ind,1,userObjToUpdate)
        res.send({message:"Update success"})
    }
})

//delete 
// http://localhost:3000/removeuser/<id>
app.delete('/removeuser/:id',(req,res)=>{
    let uid=(+ req.params.id)
    let ind=users.findIndex(userObj=>userObj.id===uid)

    if(ind===-1){
        res.send({message:"No user existed to remove"})
    }
    else{
        users.splice(ind,1)
        res.send({message:"user deleted"})
    }
})

const port=3000;
app.listen(port,()=>console.log(`server listening on port ${port}...`))