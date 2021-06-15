const fs=require('fs')
//console.log(fs)

//synchronous
let ds=fs.readFileSync('./data1.txt')
console.log("File read - ",ds.toString())
console.log("hey")

//asynchronous
fs.readFile('./data1.txt',(err,da)=>{
    if(err){
        console.log("Error is ",err)
    }
    else{
        console.log("File read - ",da.toString()) 
    }
})

console.log("hey")
console.log("hey")
console.log("hey")

//write (overwritten)
function writeToFile(data){
    fs.writeFile('./data1.txt',data,(err)=>{
        if(err){
            console.log("Error is ",err)
        }
    })
}

writeToFile("hello brother")

//append
function appendToFile(data){
    fs.appendFile('./data1.txt',data,(err)=>{
        if(err){
            console.log("Error is ",err)
        }
    })
}

appendToFile("\nLong time damon")
