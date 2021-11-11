import { Component, OnInit } from '@angular/core';
import {TokenService} from '../service/token.service';
import {BackendUserService} from '../service/backend-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public tokenService:TokenService,private userBackendService:BackendUserService,private router:Router) { }

  ngOnInit(): void {

  }
  logout(){
    this.userBackendService.loggedInUser = null;
    this.tokenService.deleteToken();
    this.router.navigate(["/tip"]);
  }

}
