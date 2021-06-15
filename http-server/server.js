const http=require("http")
const server=http.createServer((req,res)=>{
    //res.end('response is recieved')
    if(req.method=="GET")
    {
        if(req.url=='/getusers'){
        // console.log(req.url)
        // console.log("You have accessed users data")
        res.end("data..")
        }
        if(req.url=='/getproducts')
        {
            console.log(req.url)
            console.log("You have accessed products data")
            res.end()
        }
    }

    if(req.method=="POST")
    {
        if(req.url=='/createusers'){
        console.log(req.url)
        console.log("You have create users data")
        res.write("creating..")
        res.end("miss me? ")
        }
        if(req.url=='/createproducts')
        {
            console.log(req.url) 
            console.log("You create products data")
            res.end()
        }
    }
});
server.listen(2002,()=>console.log("server listening on 2002"))