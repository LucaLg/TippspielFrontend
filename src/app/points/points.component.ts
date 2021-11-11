import { Component, OnInit } from '@angular/core';
import { TipService } from '../service/tip.service';
import { BackendUserService } from '../service/backend-user.service';
import { ApiService } from '../service/api.service';
import { ITip } from '../model/ITip';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private route: ActivatedRoute,
    private tipService: TipService,
    private userBackendService: BackendUserService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getCurrentMatchweekID().subscribe((res) => {
      this.currentGroupId = res.GroupID;
      this.getLastTips();
    });
  }

  getLastTips() {
    this.tipService
      .getLastTips(this.userBackendService.loggedInUser)
      .subscribe((res) => {
        res.forEach((value) => {
          this.currentGroupId == value.matchDayID
            ? this.lastTips.push(value)
            : console.log('No');

          this.checkPoints(this.lastTips[this.lastTips.length - 1]);
        });

        this.loaded = true;
      });
  }

  checkPoints(tip: ITip) {
    this.apiService.getScoreOfMatchID(tip.matchId).subscribe((res) => {
      tip.actHomeScore = res.matchResults[0].pointsTeam1;
      tip.actAwayScore = res.matchResults[0].pointsTeam2;

      tip.points = this.calcPoints(tip);

      this.sumPoints = this.sumPoints + tip.points;

      this.tipService.updateTip(tip, this.userBackendService.loggedInUser);
      //console.log(tip.matchId + ' ' + tip.actHomeScore + ' ' + tip.actAwayScore);
    });
  }

  calcPoints(tip: ITip): number {
    let diffTip: number = tip.tipAwayScore - tip.tipHomeScore;
    let diffAct: number = tip.actAwayScore - tip.actHomeScore;
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
}
