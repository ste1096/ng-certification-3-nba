import { Observable, Subscription, tap } from 'rxjs'

import { Component, Input, OnDestroy, OnInit } from '@angular/core'

import { Game, Stats, Team } from '../../data.models'
import { ModalDialogService } from '../../services/modal-dialog.service'
import { NbaService } from '../../services/nba.service'

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css'],
  providers: [ModalDialogService]
})
export class TeamStatsComponent implements OnInit, OnDestroy {

  @Input() team!: Team;
  days!: number

  games$!: Observable<Game[]>;
  stats!: Stats;

  subscription?: Subscription

  constructor(protected nbaService: NbaService, protected modalDialogService: ModalDialogService) {}

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
    this.modalDialogService.hide()
  }

  onModalConfirm() {
    this.nbaService.removeTrackedTeam(this.team)
    this.modalDialogService.hide()
  }

}
