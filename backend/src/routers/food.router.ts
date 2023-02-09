import { Router } from "express";
import asyncHandler from "express-async-handler";
import { sample_foods, sample_tags } from "../data";
import { FoodModel } from "../models/food.model";

const router =Router();

router.get("/seed",asyncHandler( //this seed(add) the foods from local to mongo atlas
   async (req,res)=>{
        const foodsCount=await FoodModel.countDocuments();
        if(foodsCount>0){
            res.send("Seed is already done!")
            return;
        }
        await FoodModel.create(sample_foods);
        res.send("Seed Is Done");
    }
))

//using the async function directly results in inconsistent behavior so we use asyncHandler
router.get("/",asyncHandler(
    async (req,res)=>{
        const foods= await FoodModel.find();//await work when we have async at the beginning of function
        res.send(foods);
    }
))


// different because we directly want to do the search inside the database we don`t want get all the foods and search through it
router.get("/search/:searchTerm",asyncHandler(
    async (req,res)=>{
        //create a regular expression//reason is that we want to create a search case insensitive
        const searchRegex = new RegExp(req.params.searchTerm, 'i');//i make searchTerm insensitive//instead of tolowercase() or uppercase()
        const foods =await FoodModel.find({name:{$regex:searchRegex}})
        res.send(foods);
    }
))

router.get("/tags",asyncHandler(
    async (req,res)=>{
        const tags=await FoodModel.aggregate([
            {
                $unwind:'$tags'//tags filed//for example you have 2foods with 3 tags ,after unwind with tags =>you going to have 6foods that each food has 1 tag property with only one item
            },
            {
                $group:{//find similar ones and count them
                    _id:'$tags',
                    count:{$sum:1}
                }
            },
            {$project:{//make similar to structure of the front end
                _id:0,
                name:'$_id',
                count:'$count'
            } 
            }
        ]).sort({count:-1});//-1 means highest count to the lowest count //this is just give us name of the tag and count of the tag
        const all ={
            name:"All",
            count:await FoodModel.countDocuments()
        }
        tags.unshift(all);//so add all in start of the tag array//unshift is exactly opposite of push

       res.send(tags); 
    }
))

router.get("/tag/:tagName",asyncHandler(
    async (req,res)=>{
        const foods = await FoodModel.find({tags:req.params.tagName})
        res.send(foods);
    }
))


router.get("/:foodId",asyncHandler(
    async (req,res)=>{
        const food = await FoodModel.findById(req.params.foodId);
        res.send(food);
    }
)) 


export default router;