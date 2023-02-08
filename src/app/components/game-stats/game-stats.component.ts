import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'

import { Team } from '../../data.models'
import { NbaService } from '../../services/nba.service'

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit, OnDestroy{

  subscriptions: Subscription[] = []
  allTeams: Team[] = [];
  filteredTeams: Team[] = [];
  conferences: string[] = []
  divisions: string[] = []
  days = [6, 12, 20]

  selectedConference: string = ''
  selectedDivision: string = ''
  selectedDays!: number

  constructor(protected nbaService: NbaService) {
    const sub = nbaService.getAllTeams().subscribe((teams)=>{
      this.allTeams = teams
      this.filterConferences()
      this.filterDivisions()
      this.filterTeams()
    });
    this.subscriptions.push(sub)
  }

  ngOnInit() {
    const sub = this.nbaService.days$.subscribe((days)=>{
      this.selectedDays = days
    })
    this.subscriptions.push(sub)
  }

  ngOnDestroy() {
    this.subscriptions?.forEach((sub)=>sub?.unsubscribe())
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

  onChangeDays(){
    this.nbaService.days$.next(this.selectedDays)
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
