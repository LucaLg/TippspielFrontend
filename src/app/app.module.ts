import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TipComponent } from './Tipsite/tip/tip.component';

import {HttpClientModule} from '@angular/common/http';
import { GroupListComponent } from './group/group-list/group-list.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
const routes:Routes = [
  {path: 'register',component:RegisterComponent},
  {path:'login' ,component:LoginComponent},
  {path: 'tip',component: TipComponent},
  {path: 'group',component:GroupListComponent},
  {path: 'newGroup',component:NewGroupComponent},
  {path: '**', redirectTo: '/tip' }
];
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    TipComponent,
    GroupListComponent,
    NewGroupComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
