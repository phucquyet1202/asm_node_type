import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product";
import userRouter from "./routes/auth";
import categoryRouter from "./routes/category";
import cartRouter from "./routes/cart";
import commentRouter from "./routes/comment";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

// khởi tạo
const app = express();

app.use(express.json());
app.use(cors())
app.use("/products", productRouter);
app.use('/', userRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/comments', commentRouter)


mongoose.connect(process.env.URI)

export const viteNodeApp = app;
