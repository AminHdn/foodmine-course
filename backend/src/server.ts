import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})
// const url = process.env.MONGO_URL
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => app.listen(PORT, () => console.log("Server up and running!")
// .catch((error) => console.log(error.message) 
// mongoose.set('useFindAndModify', false)