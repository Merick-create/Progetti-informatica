import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-squadra',
  standalone: false,
  templateUrl: './squadra.component.html',
  styleUrl: './squadra.component.css'
})
export class SquadraComponent implements OnInit{
   squadre: any[] = [];
  nuovaSquadra = {
    name: '',
    id_atlete: [] as string[] 
  };
  showForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.caricaSquadre();
  }

  caricaSquadre() {
    this.http.get<any[]>('/api/squadre').subscribe({
      next: data => {
        this.squadre = data;
      },
      error: err => {
        console.error('Errore nel caricamento squadre:', err);
      }
    });
  }

  aggiungiSquadra() {
    this.http.post('/api/squadre', this.nuovaSquadra).subscribe({
      next: res => {
        this.nuovaSquadra = { name: '', id_atlete: [] };
        this.caricaSquadre();
        this.showForm = false;
      },
      error: err => {
        console.error('Errore nella creazione della squadra:', err);
      }
    });
  }

   onAtleteInputChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.nuovaSquadra.id_atlete = input
      .split(',')
      .map(id => id.trim())
      .filter(id => id !== '');
  }
}
