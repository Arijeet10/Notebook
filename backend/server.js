const express=require("express");
const app=express();
app.use(express.json());

const cors=require("cors");
app.use(cors());

const dotenv=require("dotenv");
dotenv.config();

const mongoose=require("mongoose");
const uri=process.env.MONGODB_SERVER
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection established successfully")
})

const userRoute=require("./routes/user");
app.use("/user",userRoute);
const notesRoute=require("./routes/notes");
app.use("/notes",notesRoute);


const PORT=process.env.PORT || 5000
app.listen(PORT,function(){
    console.log("Server running on PORT:5000")
})

