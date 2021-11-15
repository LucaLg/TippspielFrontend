import { Fixture } from './Fixture';
import { Team } from './Team';

export interface ITip {
  tipHomeScore: number;
  tipAwayScore: number;
  matchId: number;
  team1: Team;
  team2: Team;
  hometeam: string;
  awayteam: string;
  user: String;
  matchDayID: number;
  id?: number;
  actHomeScore?: number | string;
  actAwayScore?: number | string;
  points?: number | string;
}
