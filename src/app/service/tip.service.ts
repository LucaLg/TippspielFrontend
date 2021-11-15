import { Injectable } from '@angular/core';
import { BackendUserService } from './backend-user.service';
import { HttpClient } from '@angular/common/http';
import { ITip } from '../model/ITip';
import { URL } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipService {
  getAllMatchweeks(): Observable<number[]> {
    return this.http.get<number[]>(
      URL + '/tips/matchweek/' + this.userBackendService.loggedInUser
    );
  }

  constructor(
    private userBackendService: BackendUserService,
    private http: HttpClient
  ) {}
  saveTips(tips: ITip[]) {
    if (tips != null && this.userBackendService.loggedInUser != null) {
      return this.http
        .post<ITip[]>(
          URL + '/tips/' + this.userBackendService.loggedInUser + '/saveTips',
          tips
        )
        .subscribe((res) => {
          console.log('Gespeichert');
          console.log(res);
        });
    } else {
      alert('Du muss eingeloggt sein um tippen zu können!');
    }
  }
  getTipsByUsername() {
    return this.http.get<ITip[]>(
      URL + '/tips/' + this.userBackendService.loggedInUser
    );
  }
  getTipByMatchIdAndUsername(matchId: number) {
    return this.http.get<ITip>(
      URL + '/tips/' + matchId + '/' + this.userBackendService.loggedInUser
    );
  }
  getTipsByMatchWeek(matchweekId: number) {
    return this.http.get<ITip[]>(
      URL +
        '/tips/matchweek/' +
        this.userBackendService.loggedInUser +
        '/' +
        matchweekId
    );
  }
  getLastTips(username: String) {
    return this.http.get<ITip[]>(URL + '/tips/' + username);
  }
  updateTip(tip: ITip, username: string) {
    return this.http.put(URL + '/tips/' + username, tip).subscribe((res) => {
      console.log(res);
    });
  }
}
