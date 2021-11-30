import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendUserService } from '../../service/backend-user.service';
import { TokenService } from '../../service/token.service';
import { IUser as User } from '../../model/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private backendService: BackendUserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  onLogin() {
    this.backendService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (res) => {
          this.tokenService.storeToken(
            res.access_token,
            this.loginForm.value.username
          );
          this.backendService.loggedInUser = this.loginForm.value.username;
          this.router.navigate(['/tip']);
        },
        (error) => {
          alert('Falsche Daten angegeben!');
        }
      );
  }
  onRegister() {
    let username: string = this.loginForm.value.username;
    let newUser: User = {
      username: username,
    };
    this.backendService
      .register(newUser, this.loginForm.value.password)
      .subscribe(
        (res) => {
          this.backendService
            .login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
              (res) => {
                this.tokenService.storeToken(
                  res.access_token,
                  this.loginForm.value.username
                );
                this.backendService.loggedInUser =
                  this.loginForm.value.username;
                this.router.navigate(['/tip']);
              },
              (error) => {
                alert('Falsche Daten angegeben!');
              }
            );
        },
        (error) => {
          alert('Ein Fehler ist aufgetreten!');
        }
      );
  }
}
