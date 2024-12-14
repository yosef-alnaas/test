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

