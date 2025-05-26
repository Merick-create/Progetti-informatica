import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-squadra',
  standalone: false,
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css'] // corretto: `styleUrls` al plurale
})
export class SquadraComponent implements OnInit {
  squadre: any[] = [];

  nuovaSquadra = {
    name: '',
    id_atlete: [] as string[]
  };

  elencoAtlete: any[] = [];
  showForm = false;
  showAtleteList = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.caricaSquadre();
    this.caricaAtlete();
  }

  caricaSquadre(): void {
    this.http.get<any[]>('/api/squadre').subscribe({
      next: data => this.squadre = data,
      error: err => console.error('Errore nel caricamento squadre:', err)
    });
  }

  caricaAtlete(): void {
    this.http.get<any[]>('/api/').subscribe({
      next: data => this.elencoAtlete = data,
      error: err => console.error('Errore nel caricamento atlete:', err)
    });
  }

  toggleAtletaList(): void {
    this.showAtleteList = !this.showAtleteList;
  }

  toggleAtletaSelection(atletaId: string): void {
    const index = this.nuovaSquadra.id_atlete.indexOf(atletaId);
    if (index === -1) {
      this.nuovaSquadra.id_atlete.push(atletaId);
    } else {
      this.nuovaSquadra.id_atlete.splice(index, 1);
    }
  }

  isSelected(atletaId: string): boolean {
    return this.nuovaSquadra.id_atlete.includes(atletaId);
  }

  aggiungiSquadra(): void {
    this.http.post('/api/addsquadra', this.nuovaSquadra).subscribe({
      next: () => {
        this.nuovaSquadra = { name: '', id_atlete: [] };
        this.caricaSquadre();
        this.showForm = false;
        this.showAtleteList = false;
      },
      error: err => console.error('Errore nella creazione della squadra:', err)
    });
  }
}
