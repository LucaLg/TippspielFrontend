import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipComponent } from './Tipsite/tip/tip.component';

import { HttpClientModule } from '@angular/common/http';
import { GroupListComponent } from './group/group-list/group-list.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
import { PointsComponent } from './points/points.component';
import { PointsResolver } from './points/points.resolver';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserButtonComponent } from './nav/user-button/user-button.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tip', component: TipComponent },
  { path: 'group', component: GroupListComponent },
  { path: 'newGroup', component: NewGroupComponent },
  {
    path: 'points',
    component: PointsComponent,
    resolve: {
      points: PointsResolver,
    },
  },
  { path: '**', redirectTo: '/tip' },
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
    PointsComponent,
    UserButtonComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
