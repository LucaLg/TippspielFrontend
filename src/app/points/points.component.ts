import { Component, OnInit } from '@angular/core';
import { TipService } from '../service/tip.service';
import { BackendUserService } from '../service/backend-user.service';
import { ApiService } from '../service/api.service';
import { ITip } from '../model/ITip';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { IUser as User } from 'app/model/IUser';
import { Fixture } from 'app/model/Fixture';
import { Observable } from 'rxjs';
import { PointsService } from 'app/service/points.service';

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
  loadedMatchweek: number;
  lastTips: ITip[] = [];
  changed: boolean = false;
  loaded: boolean = false;
  sumPoints: number = 0;
  indexTips = 0;
  displayedTips: ITip[] = [];
  noTipsToDisplay: boolean = false;
  matchWeeksTipped: number[] = [];

  //Neue
  userPoints: string[] = [];
  loadedFixtures: Fixture[] = [];
  displayedCols: string[] = ['hometeam', 'awayteam', 'act'];
  userCols: string[] = ['homescore', 'awayscore'];
  tipps: Map<string, Map<number, ITip[]>> = new Map<
    string,
    Map<number, ITip[]>
  >();
  loadedMatchDay = 0;
  tippsLoaded = false;
  points: number[];
  currentMatchweek: number;
  finishedMatchweek: boolean = false;
  usersGiven = false;
  errorMessage =
    ' Nicht alle Spieler haben Tipps für diesen Spieltag abgegeben!';
  constructor(
    private route: ActivatedRoute,
    private tipService: TipService,
    private userBackendService: BackendUserService,
    private apiService: ApiService,
    private pointsService: PointsService
  ) {
    if (this.route.snapshot.queryParamMap.get('user')) {
      this.userPoints.push(this.route.snapshot.queryParamMap.get('user'));
    }
    if (this.route.snapshot.queryParamMap.get('ArrayUsers')) {
      this.userPoints = JSON.parse(
        this.route.snapshot.queryParamMap.get('ArrayUsers')
      );
    }
    if (this.userPoints.length == 1) {
      this.errorMessage = 'Kein Tipp für diesen Spieltag abgegeben!';
    }
    this.userPoints.forEach((user) => {
      let tipMap = new Map<number, ITip[]>();
      this.tipps.set(user, tipMap);
    });
    if (this.userPoints.length > 0) {
      this.usersGiven = true;
    }
  }

  ngOnInit(): void {
    this.apiService.getCurrentMatchweekID().subscribe((res) => {
      this.loadedMatchweek = res.GroupOrderID;
      this.currentMatchweek = this.loadedMatchweek;
      this.loadFixtures(this.loadedMatchweek);
    });
  }
  /*
      Callt Api und holt jedes Spiel des aktuell zu ladenen Spieltags.
      Fur jedes geladene Spiel wird bei jedem angegebenen Spieler,der dargestellt werden soll,
      gepruft ob dieser ein Tipp fuer dieses Spiel abgegeben hat.
      Falls ja wird fuer dieses Spiel die updateTipsInMap Methode aufgerufen.
  */
  loadFixtures(matchWeek: number) {
    this.apiService.getFixturesOfMatchDay(matchWeek).subscribe(
      (matchweek) => {
        this.loadedFixtures = matchweek;
        if (this.usersGiven) {
          this.loadedFixtures.forEach((fix) => {
            //Lade alle Tips von User
            this.finishedMatchweek =
              this.finishedMatchweek || fix.matchIsFinished;
            this.userPoints.forEach((user) => {
              this.getTipsOfUser(fix.matchID, user).subscribe(
                (res) => {
                  this.updateTipsInMap(res, user);
                },
                (error) => {
                  console.log(error.message);

                  this.noTipsToDisplay = true;
                }
              );
            });
          });
        }
        this.tippsLoaded = true;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getTipsOfUser(matchId: number, username: string): Observable<ITip> {
    return this.tipService.getTipByMatchIdAndUsername(matchId, username);
  }
  /*
  Berechnet fuer die ubergebenen Spiele und Usernamen die Punkte falls mit der ckeckPoints Methode
  daraufhin wird die Map User Tipps befuellt die in der Liste ausgeben wird.
  */
  updateTipsInMap(tip: ITip, username: string) {
    tip = this.checkPoints(tip, username);

    if (!this.tipps.get(username).has(tip.matchDayID)) {
      this.tipps.get(username).set(tip.matchDayID, []);
    }
    let isPresent =
      this.tipps
        .get(username)
        .get(tip.matchDayID)
        .filter((t) => t.matchId == tip.matchId).length > 0;

    if (!isPresent) {
      this.tipps.get(username).get(tip.matchDayID).push(tip);
    }
  }

  checkPoints(tip: ITip, user: string): ITip {
    this.apiService.getScoreOfMatchID(tip.matchId).subscribe(
      (res) => {
        if (res.matchIsFinished) {
          tip.actHomeScore = res.matchResults[0].pointsTeam1;
          tip.actAwayScore = res.matchResults[0].pointsTeam2;

          tip.points = this.calcPoints(tip);

          this.sumPoints = this.sumPoints + tip.points;

          this.tipService.updateTip(tip, user);
        }
      },
      (errpr) => {}
    );

    return tip;
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

  /*
  Paginator Navigation Functions
  */
  changeTips(index: number) {
    this.indexTips += index;
    this.loadedMatchweek += index;

    // this.getLastTips(this.matchWeeksTipped[this.indexTips]);
    for (let [key, value] of this.tipps) {
      value.clear();
    }
    this.loadFixtures(this.loadedMatchweek);
  }
  getToCurrentMatchDay() {
    this.loadedMatchweek = this.currentMatchweek;
    this.loadFixtures(this.currentMatchweek);
  }
}
