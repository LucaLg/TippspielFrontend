import {Team} from './Team';

export class Fixture{
   matchID:number;
  // spieltag:string;

   team1:Team;
   team2:Team;
   homescore?:number;
   awayscore?:number;
}
