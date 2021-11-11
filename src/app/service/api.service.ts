import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Fixture} from '../model/Fixture';
import {Team} from '../model/Team';
import {ITip} from '../model/ITip';
import {IMatchweek} from '../model/IMatchweek';
import {IMatchGroup} from '../model/IMatchGroup';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  fixtures: Fixture[];
  URL: string = 'https://api.openligadb.de/getmatchdata';

  constructor(private http: HttpClient) {
  }

  getCurrentMatchweek() {
    return this.http.get<Fixture[]>(this.URL + '/bl1');
  }

  getScoreOfMatchID(matchID: number) {
    return this.http.get<Fixture>(this.URL + '/' + matchID);
  }
  getCurrentMatchweekID(){
    return this.http.get<IMatchGroup>('https://www.openligadb.de/api/getcurrentgroup/bl1');
  }
}
