import express from "express"; // after writing   "type": "module" in package.json
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

dotenv.config({});

app.get("/home", (req, res)=>{
    return res.status(200).json({
        message:"I am comming from backend",
        success:true
    })
})


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin: 'http://localhost:5173',
    credentials:true 
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`)
})