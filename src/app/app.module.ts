import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtleteComponentComponent } from './Components/atlete-component/atlete-component.component';
import { CalendarComponentComponent } from './Components/calendar-component/calendar-component.component';
import { HomeComponentComponent } from './Components/home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';
import { SquadraComponent } from './Components/squadra/squadra.component';
import { AllenamentiComponent } from './Components/allenamenti/allenamenti.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AtleteComponentComponent,
    CalendarComponentComponent,
    HomeComponentComponent,
    SquadraComponent,
    AllenamentiComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
