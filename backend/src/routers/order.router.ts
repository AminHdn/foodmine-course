import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constant/http_status";
import { OrderStatus } from "../constant/order_status";
import auth from "../middlewares/auth.mid";
import { OrderModel } from "../models/order.model";



const router =Router();

router.use(auth)


router.post('/create',
asyncHandler(async (req:any ,res:any)=>{
    const requestOrder = req.body;

    if(requestOrder.items.length<=0){//there is no Item 
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }
    await OrderModel.deleteOne({
        user:req.user.id,
        status:OrderStatus.NEW
    });
})
)

