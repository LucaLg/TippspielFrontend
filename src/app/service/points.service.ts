import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITip } from 'app/model/ITip';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipService } from './tip.service';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  constructor(private http: HttpClient) {}
  updatePoints(username: string) {}
}
