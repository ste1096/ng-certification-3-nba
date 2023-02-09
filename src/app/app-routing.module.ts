import { GameResultsComponent, GameStatsComponent } from 'src/app/components'

import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [{
  path: "results/:teamAbbr", component: GameResultsComponent
}, {
  path: "**", component: GameStatsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
