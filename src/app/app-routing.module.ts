import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './Components/home-component/home-component.component';
import { CalendarComponentComponent } from './Components/calendar-component/calendar-component.component';
import { AtleteComponentComponent } from './Components/atlete-component/atlete-component.component';
import { SquadraComponent } from './Components/squadra/squadra.component';
import { AllenamentiComponent } from './Components/allenamenti/allenamenti.component';

const routes: Routes = [
  {path:'',component:HomeComponentComponent},
  {path:'calendar',component:CalendarComponentComponent},
  {path:'atlete',component:AtleteComponentComponent},
  {path:'squadre',component:SquadraComponent},
  {path:'allenamenti',component:AllenamentiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
