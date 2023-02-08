import { Observable, Subscription, tap } from 'rxjs'

import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Game, Stats, Team } from '@app/models'
import { ModalService, NbaService } from '@app/services'

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
  providers: [ModalService]
})
export class TeamStatsComponent implements OnInit, OnDestroy {

  @Input() team!: Team;
  days!: number

  games$!: Observable<Game[]>;
  stats!: Stats;

  subscription?: Subscription

  constructor(protected nbaService: NbaService, protected modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.nbaService.days$.subscribe((days)=>{
      this.days = days
      this.games$ = this.nbaService.getLastResults(this.team, days).pipe(
        tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
      )
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  onModalCancel() {
    this.modalService.hide()
  }

  onModalConfirm() {
    this.nbaService.removeTrackedTeam(this.team)
    this.modalService.hide()
  }

}
