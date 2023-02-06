import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import {sample_tags} from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
  getAll():Food[]{
    return sample_foods;

  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
  getFoodByID(foodId:string):Food{
    return this.getAll().find(food=>food.id==foodId)  ?? new Food();
  }
  getAllTags():Tag[]{
    return sample_tags;
  }

  getAllFoodsByTag(tag:string):Food[]{
    return tag =='All'?
    this.getAll():
    this.getAll().filter((food)=>food.tags?.includes(tag));
  }
}
