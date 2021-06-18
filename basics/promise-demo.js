const { setTimeout } = require("timers");

let status=true;

//create a promise

let myPromise= new Promise((resolve,reject)=>{
    if(status===true){
        setTimeout(()=>{
            resolve("Promise resolved")
        },5000)
    }
    else{
        setTimeout(()=>{
            resolve("Promise rejected")
        },5000)
    }
})

myPromise
    .then((data)=>{
        console.log("Data is",data)
    })
    .catch(err=>{
        console.log("err is",err)
    })

console.log("This is outside of promise")