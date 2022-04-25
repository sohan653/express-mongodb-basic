const express=require('express');
const app=express();
const port=process.env.PORT ||4000;
var cors = require('cors')
app.use(cors())
app.use(express.json())
const fish=[
    {id:1,name:'shol', pukur:'sonadanga'},
    {id:2,name:'magur', pukur:'sonadanga'},
    {id:3,name:'puti', pukur:'sonadanga'},
    {id:4,name:'sati', pukur:'sonadanga'},
    {id:5,name:'chepra', pukur:'sonadanga'},
    {id:6,name:'tengra', pukur:'sonadanga'},
    {id:7,name:'derka', pukur:'sonadanga'},
]

// user : fishuser1    password: qsWHboWDinuJV6Qo

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fishuser1:qsWHboWDinuJV6Qo@cluster0.hrgbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run=async ()=>{
    try{
        await client.connect(err => {
            console.log('mongodb Conneected')
        })
        // get user from server
        const fishCollection = client.db("fishExpress").collection("fish");
        app.get("/fish",async(req,res)=>{
            const kuery={}
            const cursor=fishCollection.find(kuery)
            const fishUser=await cursor.toArray();
            res.send(fishUser)
        })


        // post data send in server
        app.post('/fish', async (req,res)=>{
            const user=req.body
          const fishSend=await fishCollection.insertOne(user)
        console.log("success")
        res.send(fishSend)
         
        })
       
      
     
    }
    finally{
        await client.close();
    }


}
run().catch(console.log);



app.get("/",(req,res)=>{
   res.send('hello world sohan')
})
app.get("/fisher",(req,res)=>{
    const nm=req.query.name
    if(nm){
        const matched=fish.filter(x=> x.name.toLowerCase().includes(nm.toLowerCase()))
        res.send(matched)
    }else{
        res.send(fish)
    }
  
})


app.listen(port)