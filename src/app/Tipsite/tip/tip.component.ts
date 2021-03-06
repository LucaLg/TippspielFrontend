import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

import { Fixture } from '../../model/Fixture';
import { ITip } from '../../model/ITip';

import { ApiService } from '../../service/api.service';
import { BackendUserService } from '../../service/backend-user.service';
import { TipService } from '../../service/tip.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css'],
})
export class TipComponent implements OnInit {
  allTipsTipped = true;
  fixtures: Fixture[];
  tips: ITip[] = [];
  username: string;
  tipTime: boolean = false;
  feedback: string = '';
  constructor(
    private apiService: ApiService,
    private userBackendService: BackendUserService,
    private tipService: TipService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('Username');
    console.log(this.username);

    this.apiService.getCurrentMatchweek().subscribe((res) => {
      let date = new Date(res[0].matchDateTimeUTC);
      this.tipTime = date < new Date();

      res.forEach((res) => {
        let newTip: ITip = {
          matchId: res.matchID,
          team1: res.team1,
          team2: res.team2,
          tipHomeScore: null,
          tipAwayScore: null,

          user: this.userBackendService.loggedInUser,
          matchDayID: res.group.groupOrderID,
          actAwayScore: -1,
          actHomeScore: -1,
          hometeam: res.team1.shortName,
          awayteam: res.team2.shortName,
        };

        this.tips.push(newTip);
      });
      this.initTips();
    });
  }

  initTips() {
    if (this.username != null && this.tips != null) {
      //Check if User has Tipped before
      this.tipService.getAllMatchweeks().subscribe((matchweeks) => {
        if (matchweeks.includes(this.tips[0].matchDayID)) {
          this.tips.forEach((tip) => {
            this.tipService
              .getTipByMatchIdAndUsername(tip.matchId, this.username)
              .subscribe(
                (res) => {
                  //console.log(res);
                  if (res != null) {
                    tip.tipHomeScore = res.tipHomeScore;
                    tip.tipAwayScore = res.tipAwayScore;
                  }
                },
                (error) => {
                  console.log('Tips not found!');
                }
              );
          });
        }
      });
    }
  }

  save() {
    for (let tip of this.tips) {
      if (
        tip.tipAwayScore == null ||
        tip.tipAwayScore < 0 ||
        tip.tipHomeScore < 0 ||
        tip.tipHomeScore == null
      ) {
        this.allTipsTipped = false;
        this.feedback = 'Tipps nicht korrekt oder nicht alle Spiele getippt!';
        return;
      }
    }
    this.feedback = 'Tipps gespeichert!';
    this.allTipsTipped = true;
    this.tipService.saveTips(this.tips);
  }
}
