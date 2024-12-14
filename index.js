const app=require('./app');
const db=require('./config/DB');
const usermodel=require('./modle/user.modle');

const port= process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("hello world")
});

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`);
})  

