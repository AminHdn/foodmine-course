import { model, Schema } from "mongoose";

export interface Food{
    id:string;//! means required
    name:string;
    price:number;
    tags:string[];// ? means optional
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string;
}


export const FoodSchema= new Schema<Food>(
{
    name:{type:String,required:true},
    price:{type:Number,required:true},
    tags:{type:[String] },
    favorite:{type:Boolean,default:false},
    stars:{type:Number,required:true},
    imageUrl:{type:String,required:true},
    origins:{type:[String],required:true},
    cookTime:{type:String,required:true},

},{
    toJSON:{
        virtuals:true //_id change to id
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
}

);

export const FoodModel=model<Food>('food',FoodSchema);