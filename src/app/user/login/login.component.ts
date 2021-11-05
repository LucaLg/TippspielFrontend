import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BackendUserService} from '../../service/backend-user.service';
import {TokenService} from '../../service/token.service';
import {User} from '../../model/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required,Validators.minLength(1)]),
    password : new FormControl('',[Validators.required,Validators.minLength(1)])
  });
  constructor(private backendService:BackendUserService, private tokenService:TokenService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.backendService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(res => {
      this.tokenService.storeToken(res.access_token,this.loginForm.value.username);
      this.backendService.loggedInUser = this.loginForm.value.username;
      this.router.navigate(["/tip"]);
    },error => {
      alert("Falsche Daten angegeben!");
    });

  }
}
