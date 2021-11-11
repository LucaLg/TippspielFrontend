import {Team} from './Team';
import {MatchResult} from './MatchResult';
import {IMatchweek} from './IMatchweek';

export class Fixture{
   matchID:number;
   team1:Team;
   team2:Team;
   matchResults:MatchResult[];
   group:IMatchweek;
   pointsTeam1?:number;
   pointsTeam2?:number;
}
