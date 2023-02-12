import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);//by using this all the class which is using loading Service inform about state of loading

  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true);
  }

  hideLoading(){
    this.isLoadingSubject.next(false);
  }

  //nobody can change value//whit this just can  read
  get isLoading(){
    return this.isLoadingSubject.asObservable();

  }
}
