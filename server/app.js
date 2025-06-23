import express from "express"
import dotenv from "dotenv";
import connectDB from "./src/config/dbconnect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//routes
import authRoutes from "./src/router/Auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true 
}));

app.get("/",(req,res)=>{
  res.send("testing")
})
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
