import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_Register_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
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
  public get currentUser():User{
   return this.userSubject.value;
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

   register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_Register_URL,userRegister).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            'Register Successful'
          )
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error,'Register Failed')
        }
      })
    )
   }



   logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
   }

   private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
   
   }

   private getUserFromLocalStorage():User{
    const userJson=localStorage.getItem(USER_KEY)
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
   }

  
}
