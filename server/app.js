import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.get("/",(req,res)=>{
  res.send("testing")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});