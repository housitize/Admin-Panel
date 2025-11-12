import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import medicineRouter from "./routes/medicineRoute.js";

dotenv.config();

//App config
const app = express();
const port = process.env.PORT || 8080;
connectDb();


//middewares

// app.use(express.json());
// app.use(cors());

app.use(cors({ origin: "*", credentials: true }));


// CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
//     credentials: true,
//   })
// );

// Keep tiny limits for JSON; files go via multer
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

//api end points
app.use("/api/user" , userRouter);

// api for medicine
app.use("/api/medicine" , medicineRouter);

app.get("/" ,(req , res)=>{
    res.send("API working")
})

app.listen(port , ()=>{
    console.log("server started on PORT:" + port)
})