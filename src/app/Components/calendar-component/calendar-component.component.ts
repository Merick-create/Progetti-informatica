import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';  
import 'bootstrap';


@Component({
  selector: 'app-calendar-component',
  standalone: false,
  templateUrl: './calendar-component.component.html',
  styleUrl: './calendar-component.component.css'
})
export class CalendarComponentComponent {
  openModal() {
  }

  addEvent() {
    
  }
}
