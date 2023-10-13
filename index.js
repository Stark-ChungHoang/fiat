
import express from  "express"
const app = express()
app.listen(5001,()=> {
    console.log("chung")
})
app.get('/',(req,res) => res.json("My API runing"))