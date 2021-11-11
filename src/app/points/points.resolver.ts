import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TipService} from '../service/tip.service';
import {BackendUserService} from '../service/backend-user.service';
import {ApiService} from '../service/api.service';
import {ITip} from '../model/ITip';

@Injectable({
  providedIn: 'root'
})
export class PointsResolver implements Resolve<boolean> {

  constructor(private tipService: TipService, private userBackendService: BackendUserService, private apiService: ApiService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
   return  this.apiService.getCurrentMatchweekID();

  }

}
