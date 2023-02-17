const app = require("express")();
const server = require("http").Server(app);
const connect = require("./db/connection");
const cors = require("cors");
const userModel = require("./db/Model/model");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("OK");
  res.end();
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const run = async () => {
  try {
    await connect();
    io.on("connection", (socket) => {
      socket.emit("verification", "please verify yourself");
      socket.on("new-msg", async ({ message, reciever }) => {
        const sender = await userModel.findOne({ socket: socket.id });
        console.log(sender);
        // console.log(sender?.uName);
        let obj = { message: message, sender: sender?.uName || "unknow" };
        if (reciever) {
          const user = await userModel.findOne({ uName: reciever });
          if (user) {
            const userSocket = user.socket;
            console.log(io.to(userSocket).emit("recieve", obj));

            // socket.to()
          } else {
            console.log("Not Exist");
          }
        }
        // console.log(object);
        else socket.broadcast.emit("recieve", obj);
      });
      socket.on("send-jwt", async (token) => {
        // console.log("jwt: ", token);
        const user = jwt.verify(token, "chat-application");
        const { email, pass } = user;
        const getUser = await userModel.findOne({ email, pass });
        if (getUser) getUser.socket = socket.id;
        getUser.save();
        console.log(getUser);
      });
      socket.on("disconnnecting", () => {
        console.log("disconnect");
      });
    });
    app.post("/api/login", async (req, res) => {
      console.log("login called");
      if (req.body) {
        console.log(req.body);
        //  const {email, pass} = req.body;
        const user = await userModel.findOne(req.body);
        if (user) {
          console.log(user);
          const { email, uName, pass } = user;
          const userTokenObj = { email, uName, pass };
          const token = jwt.sign(userTokenObj, "chat-application", {
            algorithm: "HS256",
          });
          res.cookie("token", token).status(200).json("Login");
        } else res.status(401);
        res.end();
      }
    });
    app.post("/api/signup", async (req, res) => {
      if (req.body) {
        const newUser = new userModel(req.body);
        const response = await newUser.save();

        res.json(response);
      }
      res.end();
    });
  } catch (e) {
    console.log(e.message);
  }
};

run();
server.listen(5000, function () {
  console.log("listening on *:5000");
});
