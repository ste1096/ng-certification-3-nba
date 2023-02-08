import { Observable, Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Game, Team } from '../../data.models'
import { NbaService } from '../../services/nba.service'

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit, OnDestroy {

  team?: Team;
  days?: number;
  games$?: Observable<Game[]>;

  subscription?: Subscription

  constructor(private activatedRoute: ActivatedRoute, private nbaService: NbaService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
        this.team = this.nbaService.getTrackedTeams().find(team => team.abbreviation === paramMap.get("teamAbbr"));
    })
  }

  ngOnInit() {
    this.subscription = this.nbaService.days$.subscribe((days)=>{
      this.days = days
      if (this.team)
      this.games$ = this.nbaService.getLastResults(this.team, days);
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
