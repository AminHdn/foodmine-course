import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm='';
  //when you add private or public to the parameters it will work on all of class
  //but if don't use it will work on just constructor
  constructor(activatedRoute:ActivatedRoute,private router:Router){
    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm) this.searchTerm=params.searchTerm;
    });
  }
  ngOnInit():void{

  }
  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+term)
  }

}
