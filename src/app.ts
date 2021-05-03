import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Request, Response, urlencoded } from "express";
import { router } from "./routes/routes";
dotenv.config();
const app = express();

app.use(express, urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL as string,

    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    () => {
        console.log("DB Connected!!")
    })
app.use("/post", router)

app.listen(8080, () => {
    console.log("Server is running at 8080");
});
