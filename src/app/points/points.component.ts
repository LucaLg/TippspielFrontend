import { Component, OnInit } from '@angular/core';
import { TipService } from '../service/tip.service';
import { BackendUserService } from '../service/backend-user.service';
import { ApiService } from '../service/api.service';
import { ITip } from '../model/ITip';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css'],
})
export class PointsComponent implements OnInit {
  displayedColumns: string[] = [
    'hometeam',
    'awayteam',
    'tipp',
    'act',
    'points',
  ];
  currentGroupId: number;
  lastTips: ITip[] = [];
  changed: boolean = false;
  loaded: boolean = false;
  sumPoints: number = 0;
  indexTips = 0;
  displayedTips: ITip[] = [];
  noTipsToDisplay: boolean = false;
  matchWeeksTipped: number[] = [];
  constructor(
    private route: ActivatedRoute,
    private tipService: TipService,
    private userBackendService: BackendUserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.tipService.getAllMatchweeks().subscribe((matchweeks) => {
      this.matchWeeksTipped = matchweeks;
      console.log(this.matchWeeksTipped);
    });
    this.apiService.getCurrentMatchweekID().subscribe((res) => {
      this.currentGroupId = res.GroupID;

      this.getLastTips(this.matchWeeksTipped[this.indexTips]);
    });
  }

  getLastTips(matchweek: number) {
    this.tipService.getTipsByMatchWeek(matchweek).subscribe(
      (res) => {
        if (res.length === 0) {
          this.noTipsToDisplay = true;
        }
        this.lastTips = res;
        this.lastTips.forEach((value) => {
          this.noTipsToDisplay = false;
          this.checkPoints(value);
        });
        console.log('Ausgeführt' + matchweek);
        // console.log(this.lastTips);
        this.loaded = true;
      },
      (error) => {
        console.log(error);
        this.noTipsToDisplay = true;
      }
    );
  }

  checkPoints(tip: ITip) {
    this.apiService.getScoreOfMatchID(tip.matchId).subscribe(
      (res) => {
        if (res.matchIsFinished) {
          tip.actHomeScore = res.matchResults[0].pointsTeam1;
          tip.actAwayScore = res.matchResults[0].pointsTeam2;

          tip.points = this.calcPoints(tip);

          this.sumPoints = this.sumPoints + tip.points;

          this.tipService.updateTip(tip, this.userBackendService.loggedInUser);
        } else {
          tip.actAwayScore = '-';
          tip.actHomeScore = '-';
        }
        //console.log(tip.matchId + ' ' + tip.actHomeScore + ' ' + tip.actAwayScore);
      },
      (errpr) => {}
    );
  }

  calcPoints(tip: ITip): number {
    let diffTip: number = tip.tipAwayScore - tip.tipHomeScore;
    let diffAct: number = +tip.actAwayScore - +tip.actHomeScore;
    if (
      tip.actAwayScore == tip.tipAwayScore &&
      tip.actHomeScore == tip.tipAwayScore
    ) {
      return 3;
    } else {
      if (diffTip === diffAct) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  changeTips(index: number) {
    this.indexTips += index;
    this.getLastTips(this.matchWeeksTipped[this.indexTips]);
  }
  getToCurrentMatchDay() {
    this.getLastTips(this.matchWeeksTipped[0]);
    this.indexTips = 0;
  }
}
