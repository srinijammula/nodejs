

function teaserRelease(status){
    let movieTeaserReleasePromise= new Promise((resolve,reject)=>{
        if(status==="all is well"){
            setTimeout(()=>{
                resolve("Teaser out..enjoy")
            },5000)
        }
        else{
            setTimeout(()=>{
                reject("Sorry guys..some technical issue occured")
            },5000)
        }
    })

    return movieTeaserReleasePromise;
}

teaserRelease("all is wello")
.then(result=>{return "hey "+result})
.then(d=>{return "good news "+d})
.then(data=>{console.log("res is ",data)})
.catch(err=> {console.log("err is ",err)})