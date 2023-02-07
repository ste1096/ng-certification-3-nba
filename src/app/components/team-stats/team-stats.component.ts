import { Observable, tap } from 'rxjs'

import { Component, Input, OnInit } from '@angular/core'

import { Game, Stats, Team } from '../../data.models'
import { ModalDialogService } from '../../services/modal-dialog.service'
import { NbaService } from '../../services/nba.service'

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  @Input()
  team!: Team;

  games$!: Observable<Game[]>;
  stats!: Stats;
  constructor(protected nbaService: NbaService, protected modalDialogService: ModalDialogService) { }


  ngOnInit(): void {
    this.games$ = this.nbaService.getLastResults(this.team, 12).pipe(
      tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
    )
  }

  onModalCancel() {
    this.modalDialogService.hide()
  }

  onModalConfirm() {
    this.nbaService.removeTrackedTeam(this.team)
    this.modalDialogService.hide()
  }

}
