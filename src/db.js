import mongoose from "mongoose";

const mongoURL = `mongodb+srv://youredith:${process.env.MONGODB_PW}@pixtube.uelmwuu.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURL);

const db = mongoose.connection;

const handleOpen = () => console.log("👌 Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);