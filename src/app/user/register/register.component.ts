import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {BackendUserService} from '../../service/backend-user.service';
import {User} from '../../model/User';
import {HttpHeaders} from '@angular/common/http';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private backendService:BackendUserService, private formBuilder:FormBuilder,private tokenService:TokenService,private router:Router) { }
  registerForm = this.formBuilder.group({
    username : ["",[Validators.required,Validators.minLength(4)]],
    password :['',[Validators.required,Validators.minLength(8)]]
  })
  ngOnInit(): void {
  }
  onSubmit(){
    let username:string = this.registerForm.value.username;
    let newUser:User = {
      username:username
    };
    this.backendService.register(newUser,this.registerForm.value.password).subscribe(res=>{
      this.backendService.login(this.registerForm.value.username,this.registerForm.value.password).subscribe(res => {
        this.tokenService.storeToken(res.access_token,this.registerForm.value.username);
        this.backendService.loggedInUser = this.registerForm.value.username;
        this.router.navigate(["/tip"]);
      },error => {
        alert("Falsche Daten angegeben!");
      });
      },error => {
        alert("Ein Fehler ist aufgetreten!");
      }
    );


  }
}
