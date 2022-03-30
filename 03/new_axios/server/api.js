const express = require('express')
const app = express()
const cors = require('cors')
app.listen(8080,() => {
    console.log('express server running at http://127.0.0.1')
})
app.use(cors()) //解决跨域
app.use(express.json()) 
app.use(express.urlencoded({extended:false})) 
app.get('/api/get',(req,res) => {
    res.send({
        status:200,
        message: "get-ok",
        data:req.query,
    })
})
app.post('/api/post',(req,res) => {
    res.send({
        status:200,
        message: "post-ok",
        data:req.body,
    })
})