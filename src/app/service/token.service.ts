import {Injectable} from '@angular/core';
import {BackendUserService} from './backend-user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  hasToken: boolean = false;

  constructor(private userBackendService: BackendUserService) {
    if (localStorage.getItem('Access_Token') != null) {
      if (localStorage.getItem('Username') != null) {
        this.userBackendService.loggedInUser = localStorage.getItem('Username');
      }
      ;
      this.hasToken = true;
    } else {
      if (localStorage.getItem('Username') != null) {
        localStorage.removeItem('Username');
      }
    }

  }

  /*
  TODO
    1.Store Token
    2.Delete Token
    3.Check if Token up to date
   */
  storeToken(token: string, username: string) {
    localStorage.setItem('Access_Token', 'Bearer ' + token);
    localStorage.setItem('Username', username);
    this.hasToken = true;
  }

  deleteToken() {
    localStorage.removeItem('Username');
    localStorage.removeItem('Access_Token');
    this.hasToken = false;
  }

}
