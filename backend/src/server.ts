
import dotenv from 'dotenv';

import path from 'path';
import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import mongoose, { ConnectOptions } from 'mongoose';
// import { dbConnect } from './configs/database.config';


const app = express();
dotenv.config().parsed;
const db=process.env.MONGO_URL!;

// dbConnect();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));


mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}as ConnectOptions).then(()=>console.log("Connected"));


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
    console.log(dotenv.config(),'hi');
})
// const url = process.env.MONGO_URL
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => app.listen(PORT, () => console.log("Server up and running!")
// .catch((error) => console.log(error.message) 
// mongoose.set('useFindAndModify', false)