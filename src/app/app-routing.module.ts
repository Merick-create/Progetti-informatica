import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './Components/home-component/home-component.component';
import { CalendarComponentComponent } from './Components/calendar-component/calendar-component.component';
import { AtleteComponentComponent } from './Components/atlete-component/atlete-component.component';
import { SquadraComponent } from './Components/squadra/squadra.component';
import { AllenamentiComponent } from './Components/allenamenti/allenamenti.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './Components/auth/auth.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },        
  { path: 'home', component: HomeComponentComponent, canActivate: [AuthGuardService] }, 
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' },
  {path:'home',component:HomeComponentComponent,canActivate:[AuthGuardService]},
  {path:'calendar',component:CalendarComponentComponent,canActivate:[AuthGuardService]},
  {path:'atlete',component:AtleteComponentComponent,canActivate:[AuthGuardService]},
  {path:'squadre',component:SquadraComponent,canActivate:[AuthGuardService]},
  {path:'allenamenti',component:AllenamentiComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
