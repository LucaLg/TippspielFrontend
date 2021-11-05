import {Component, Input, OnInit} from '@angular/core';
import {Fixture} from '../../model/Fixture';
import {Tip} from '../../model/Tip';

import {ApiService} from '../../service/api.service';
import {BackendUserService} from '../../service/backend-user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TipService} from '../../service/tip.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit {
  allTipsTipped = false;
  fixtures: Fixture[];
  tips: Tip[] = [];
  username: string;
  constructor(private apiService: ApiService, private userBackendService: BackendUserService, private tipService: TipService) {

  }

  ngOnInit(): void {
    this.username = this.userBackendService.loggedInUser;
    console.log(this.username);
    this.apiService.getCurrentMatchweek().subscribe(res => {

      res.forEach(res => {
        let newTip: Tip = {
          matchId: res.matchID,
          team1: res.team1,
          team2: res.team2,
          tipHomeScore: null,
          tipAwayScore: null
        };
        this.tips.push(newTip);
      });
      this.initTips();
    });
  }

  initTips() {
    if (this.username != null && this.tips != null) {
      this.tips.forEach(tip => {
        this.tipService.getTipByMatchIdAndUsername(tip.matchId).subscribe(res => {
          //console.log(res);
          if (res != null) {
            tip.tipHomeScore = res.tipHomeScore;
            tip.tipAwayScore = res.tipAwayScore;
          }
        });
      });

    }
  }

  canSave(): boolean {
    this.tips.forEach(tip => {
      if (tip.tipAwayScore == null || tip.tipHomeScore == null) {
        return false;
      }
    });
    return true;
  }

  save() {
    this.allTipsTipped = this.canSave();
    if (!this.allTipsTipped) {
      alert('Tippe alle Spiele');
      return;
    }
    console.log(this.tips);
    this.tipService.saveTips(this.tips);
  }
}
