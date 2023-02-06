export class Food{
    id!:string;//! means required
    name!:string;
    price!:number;
    tags?:string[];// ? means optional
    favorite!:boolean;
    stars!:number;
    imageUrl!:string;
    origins!:string[];
    cookTime!:string;

}