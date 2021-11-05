import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IToken} from '../model/IToken';

@Injectable({
  providedIn: 'root'
})
export class BackendUserService {
  url:string = 'http://localhost:8080';
  loggedInUser:string;
  constructor(private http:HttpClient) {

  }
  register(user:User,password:string):Observable<User>{

    return this.http.post<User>(this.url+"/user/createUser",user,{
      observe:'response',
      params: new HttpParams({encoder: this.base64Encoder}).append("pwd",password)
    }).pipe(
      tap(response => this.checkHeader(response.headers)),
      map(response => (response.body!))
    )

  }
  checkHeader(httpHeaders:HttpHeaders){
    console.log(httpHeaders.get("Authorization"));
  }
  login(username:string,password:string){
    let body = new URLSearchParams();
    body.set('username',username);
    body.set('password',password);
    let options = {
      headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    };
    return this.http.post<IToken>(this.url+"/login",body.toString(),options);

  }
  saveTips(){

  }
  base64Encoder: HttpParameterCodec = {
    encodeKey(key: string): string {
      return key;
    },
    encodeValue(value: string): string {
      return btoa(value);
    },
    decodeKey(key: string): string {
      return key;
    },
    decodeValue(value: string): string {
      return atob(value)
    }
  };

}
