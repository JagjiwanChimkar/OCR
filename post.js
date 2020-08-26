const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})

app.post("/app",(req,res)=>{
	console.log("hello post")
	});

app.listen(3000,()=>console.log("running"));
