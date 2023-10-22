const express=require('express')

const app =express();
const AppRouters =require('./src/routes')
app.use(express.json())
app.use('/',AppRouters)
app.listen(8000, ()=>console.log("app is listening port 8000"))

