import { Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'

import { Team } from '../../models'
import { NbaService } from '../../services'

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
      this.conferences = [...new Set(this.allTeams.map(team => team?.conference))]
      this.onChangeConference()
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
    this.filteredTeams = this.filterByConference(this.allTeams)
    this.divisions = [...new Set(this.filteredTeams?.map(team => team?.division))]
    if(!this.divisions.find((div)=>div===this.selectedDivision)){
      this.selectedDivision = ''
    }else{
      this.filteredTeams = this.filterByDivision(this.filteredTeams)
    }
  }

  onChangeDivision(){
    this.filteredTeams = this.filterByDivision(this.allTeams)
  }

  onChangeDays(){
    this.nbaService.days$.next(this.selectedDays)
  }

  private filterByConference(teams: Team[]): Team[]{
    return teams?.filter(({conference})=>!this.selectedConference || conference === this.selectedConference)
  }

  private filterByDivision(teams: Team[]): Team[]{
    return teams.filter(({division})=>!this.selectedDivision || division === this.selectedDivision)
  }
}
