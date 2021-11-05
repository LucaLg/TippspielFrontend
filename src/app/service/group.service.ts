import { Injectable } from '@angular/core';
import {IGroup} from "../model/IGroup";
import {URL} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  group:IGroup[];
  constructor(private http:HttpClient) { }
  getGroupList(){
      return this.http.get<IGroup[]>(URL+'/group');
  }
}
