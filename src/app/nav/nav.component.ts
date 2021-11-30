import { Component, HostListener, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { BackendUserService } from '../service/backend-user.service';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedInUser: string = '';
  heading: string = 'Tippspiel';
  innerWidth;
  constructor(
    public tokenService: TokenService,
    private userBackendService: BackendUserService,
    private router: Router
  ) {
    tokenService.hasToken.subscribe((res) => {
      if (res) {
        this.loggedInUser = localStorage.getItem('Username');
      }
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }
  logout() {
    this.userBackendService.loggedInUser = null;
    this.tokenService.deleteToken();
    this.router.navigate(['/login']);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 800) {
      this.heading = 'TP';
    } else {
      this.heading = 'Tippspiel';
    }
    this.innerWidth = window.innerWidth;
  }
}
