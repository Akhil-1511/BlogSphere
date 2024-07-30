import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", router); 
app.use("/api/blog",blogRouter);


mongoose.connect("mongodb://127.0.0.1:27017/blogyt", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => {
    console.log("Server is listening on port 5000");
  });
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
