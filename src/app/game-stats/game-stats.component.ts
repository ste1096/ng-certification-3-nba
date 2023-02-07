import { Observable, Subscribable, Subscription, tap } from 'rxjs'

import { Component, OnDestroy } from '@angular/core'

import { Team } from '../data.models'
import { NbaService } from '../nba.service'

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnDestroy{

  subscription: Subscription
  allTeams: Team[] = [];
  filteredTeams: Team[] = [];
  conferences: string[] = []
  divisions: string[] = []

  selectedConference: string = ''
  selectedDivision: string = ''

  constructor(protected nbaService: NbaService) {
    this.subscription = nbaService.getAllTeams().subscribe((teams)=>{
      this.allTeams = teams
      this.filterConferences()
      this.filterDivisions()
      this.filterTeams()
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  trackTeam(teamId: string): void {
    let team = this.filteredTeams.find(team => team.id == Number(teamId));
    if (team)
      this.nbaService.addTrackedTeam(team);
  }

  onChangeConference(){
    this.filterDivisions()
    this.filterTeams()
  }

  onChangeDivision(){
    this.filterTeams()
  }

  private filterConferences(){
    this.conferences = [...new Set(this.allTeams.map(team => team?.conference))]
  }

  private filterDivisions(){
    this.divisions = [...new Set(this.allTeams
      .filter((team)=>!this.selectedConference || team?.conference === this.selectedConference)
      .map(team => team?.division)
    )]
    if(!this.divisions.find((div)=>div===this.selectedDivision)){
      this.selectedDivision = ''
    }
  }

  private filterTeams(){
    this.filteredTeams = this.allTeams.filter(
      (team)=>
      (!this.selectedDivision || team?.division === this.selectedDivision) &&
      (!this.selectedConference || team?.conference === this.selectedConference)
    )
  }
}
