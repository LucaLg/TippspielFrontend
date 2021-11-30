import { Injectable } from '@angular/core';
import { BackendUserService } from './backend-user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser as User } from 'app/model/IUser';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  hasToken = new Subject<boolean>();
  token: string;
  constructor(
    private userBackendService: BackendUserService,
    private jwtHelperService: JwtHelperService
  ) {
    // if (localStorage.getItem('Access_Token') != null) {
    //   console.log(this.isTokenValid());
    //   if (localStorage.getItem('Username') != null && this.isTokenValid()) {
    //     this.userBackendService.loggedInUser = localStorage.getItem('Username');
    //     this.hasToken = true;
    //   }
    //   if (!this.isTokenValid()) {
    //     this.deleteToken();
    //   }
    // } else {
    //   if (localStorage.getItem('Username') != null) {
    //     localStorage.removeItem('Username');
    //   }
    // }
    if (localStorage.getItem('Access_Token') != null) {
      this.userBackendService
        .isUserPresent(localStorage.getItem('Username'))
        .subscribe((res) => {
          if (res == false) {
            this.deleteToken();
          } else {
            this.userBackendService.loggedInUser =
              localStorage.getItem('Username');
            this.hasToken.next(true);
          }
        });
    }
  }

  storeToken(token: string, username: string) {
    this.token = token;
    localStorage.setItem('Access_Token', 'Bearer ' + token);
    localStorage.setItem('Username', username);
    this.hasToken.next(true);
  }

  deleteToken() {
    localStorage.removeItem('Username');
    localStorage.removeItem('Access_Token');
    this.hasToken.next(false);
  }
}
