const mongoose = require('mongoose');

const con=mongoose.createConnection('mongodb://127.0.0.1:27017/ChatApp').on('open',()=>{
    console.log('connected to database');
}).on('error',()=>{
    console.log('error connecting to database');
});

module.exports=con;