import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TokenService} from '../service/token.service';
@Injectable()
export class authInterceptor implements HttpInterceptor{
  constructor(private tokenService:TokenService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.tokenService.hasToken){
      req = req.clone({
        setHeaders:{
          Authorization: localStorage.getItem("Access-Token")
        }
      });
    }
    return next.handle(req);
  }
}
