const app=require('./app');
const db=require('./config/DB');
const usermodel=require('./modle/user.modle');
var http=require("http");

const port= process.env.PORT || 3000;
var server = http.createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

var claints = {};

io.on("connection", (socket) => {
    console.log("Connected");
    console.log(socket.id, "has joined");

    socket.on("signin", (id) => {
        console.log(`Client ${id} signed in with socket ID ${socket.id}`);
        claints[id] = socket;
        console.log(claints);
    });

    socket.on("message", (msg) => {
        console.log(`Message received: ${JSON.stringify(msg)}`);
        let targetId = msg.targetId;

        if (claints[targetId]) {
            claints[targetId].emit("message", msg);
        } else {
            console.log(`Target client ${targetId} not found.`);
        }
    });
    
    socket.on('start_chat_request', (data) => {
        const { sourceId, targetId, sourceName } = data;
    
        if (claints[targetId]) {
            // Send the chat request to the target user
            claints[targetId].emit('incoming_chat_request', { sourceId, sourceName });
            console.log(`Chat request sent from ${sourceId} to ${targetId}`);
        } else {
            console.log(`Target user ${targetId} is not connected.`);
        }
    });
    
    
      socket.on('accept_chat_request', (data) => {
        const { sourceId, targetId } = data;
        const chatRoomId = `${sourceId}_${targetId}`;
        io.to(sourceId).emit('chat_request_accepted', { chatRoomId });
        io.to(targetId).emit('chat_request_accepted', { chatRoomId });
      });
    

    socket.on("disconnect", () => {
        console.log(socket.id, "disconnected");

        for (let id in claints) {
            if (claints[id] === socket) {
                delete claints[id];
                console.log(`Client ${id} removed.`);
            }
        }
    });
});



app.get('/',(req,res)=>{
    res.send("hello world")
});

server.listen(port,"0.0.0.0",()=>{
    console.log(`server is running on port http://localhost:${port}`);
})  

