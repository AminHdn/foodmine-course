import { Router } from "express";
import { sample_users } from "../data";
import  asyncHandler  from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User, UserModel } from "../models/user.model";
import { FoodModel } from "../models/food.model";
import { HTTP_BAD_REQUEST } from "../constant/http_status";

import bcrypt from 'bcryptjs';


const router =Router();

router.get('/seed',asyncHandler(
    async (req,res)=>{
        const userCount=await UserModel.countDocuments();
        if(userCount>0){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
))


router.post('/login',asyncHandler(
    async (req,res)=>{
        const {email,password} = req.body;//in the body we have email and password so each one get own one//we called Destructuring Assignment
        const user = await UserModel.findOne({email,password});

            if(user){
                res.send(generateTokenResponse(user));
            }else{
                res.status(HTTP_BAD_REQUEST).send("User name or password is not valid!");
            }
    }
))


router.post('/register',asyncHandler(
    async (req,res)=>{
        const {name,email,password,address} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
            return;
        }
        //encrypt password
        const encryptedPassword =await bcrypt.hash(password,10);

        const newUser:User = {
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin:false
        }
        const dbUser= await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser))
    }
))

const generateTokenResponse= (user:any)=>{
    const token =jwt.sign({
        email:user.email,isAdmin:user.isAdmin},"SomeRandomText",{
            expiresIn:"30d"
        });
     return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
}


export default router;