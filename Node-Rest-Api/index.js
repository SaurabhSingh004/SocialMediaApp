const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const path = require("path");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer=require("multer");
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images",express.static(path.join(__dirname,"public/images")));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");

  },
  filename:(req,file,cb)=>{
    console.log("data.",req.body)
    cb(null,file.originalname);
  }
}) 
const upload =multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
      return res.status(200).json("File uploaded successfully");
  }
  catch(err)
  {
    return res.status(500).json("Internal server error File Not uploaded");
  }
})
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/",(req,res)=>{
    res.send("hello ");
})
app.listen(8800, (req,res) => {
   
  console.log("Backend server is running!");
});