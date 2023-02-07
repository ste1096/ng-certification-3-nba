import { Observable, tap } from 'rxjs'

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'

import { Game, Stats, Team } from '../../data.models'
import { ModalDialogService } from '../../services/modal-dialog.service'
import { NbaService } from '../../services/nba.service'

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnChanges {

  @Input() team!: Team;
  @Input() days!: number

  games$!: Observable<Game[]>;
  stats!: Stats;

  constructor(protected nbaService: NbaService, protected modalDialogService: ModalDialogService) { }


  ngOnChanges(sc: SimpleChanges): void {
    if(sc['days']?.currentValue){
      this.games$ = this.nbaService.getLastResults(this.team, this.days).pipe(
        tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
      )
    }
  }

  onModalCancel() {
    this.modalDialogService.hide()
  }

  onModalConfirm() {
    this.nbaService.removeTrackedTeam(this.team)
    this.modalDialogService.hide()
  }

}
