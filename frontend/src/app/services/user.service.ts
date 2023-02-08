import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';

const USER_KEY='User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =new BehaviorSubject<User>(this.getUserFromLocalStorage());//read and write inside it
  //but we don`t want any thing out side of userService write so
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    
    this.userObservable = this.userSubject.asObservable();
    //SO userObservable is a version of userSubject that can read only
   }
   // the main difference between 
   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user)
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Foodmine ${user.name}!` ,
          'Login Successful')
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error,'Login Failed');
        }
      })
      );
   }

   logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
   }

   private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
    window.location.reload();
   }

   private getUserFromLocalStorage():User{
    const userJson=localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
   }
}
