import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GameResultsComponent, GameStatsComponent } from '@app/components'

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
