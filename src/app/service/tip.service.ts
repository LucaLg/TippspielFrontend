import { Injectable } from '@angular/core';
import {BackendUserService} from './backend-user.service';
import {HttpClient} from '@angular/common/http';
import {Tip} from '../model/Tip';
import {URL} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipService {

  constructor(private userBackendService:BackendUserService,private http:HttpClient) { }
  saveTips(tips:Tip[]){
    if(tips !=null && this.userBackendService.loggedInUser != null){
      return  this.http.post<Tip[]>(URL + "/tips/" + this.userBackendService.loggedInUser + "/saveTips",tips).subscribe(res=>{
         console.log(res);
      });
    }else{
      alert("Du muss eingeloggt sein um tippen zu können!");
    }
  }
  getTipsByUsername(){

    return this.http.get<Tip[]>(URL+'/tips/'+this.userBackendService.loggedInUser);

  }
  getTipByMatchIdAndUsername(matchId:number){
    return this.http.get<Tip>(URL + '/tips/'+matchId+'/'+this.userBackendService.loggedInUser);
  }
}
