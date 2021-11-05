import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Fixture} from '../model/Fixture';
import {Team} from '../model/Team';
import {Tip} from '../model/Tip';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  fixtures:Fixture[];
  URL:string = 'https://api.openligadb.de/getmatchdata/bl1';
  constructor(private http:HttpClient) { }
  getCurrentMatchweek(){
    return this.http.get<Fixture[]>(this.URL);
  }
}
