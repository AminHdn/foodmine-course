import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import {sample_tags} from 'src/data';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAGS_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+searchTerm)
    
  }
  getFoodByID(foodId:string):Observable <Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL+foodId)
  }
  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag:string):Observable<Food[]>{
    return tag=== 'All' ?
    this.getAll() :
    this.http.get<Food[]>(FOODS_BY_TAGS_URL+tag);
  }
}
