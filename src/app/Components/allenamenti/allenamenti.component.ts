import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allenamenti',
  standalone: false,
  templateUrl: './allenamenti.component.html',
  styleUrls: ['./allenamenti.component.css']
})
export class AllenamentiComponent implements OnInit {
  squadre: any[] = [];
  allenamenti: any[] = [];

  showForm = false;

  nuovoAllenamento = {
    id_squadra: '',
    data_inizio: '',
    data_fine: ''
  };

  idSquadraSelezionata: string = '';

  filtroInizio = '';
  filtroFine = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log("ng fatto");
    this.caricaSquadre();
    this.caricaAllenamenti();
  }

caricaSquadre(): void {
    this.http.get<any[]>('/api/squadre').subscribe({
      next: data => {
        this.squadre = data},
      error: err => console.error('Errore nel caricamento squadre:', err)
    });
  }

  caricaAllenamenti() {
    this.http.get<any[]>('/api/allenamenti').subscribe({
      next: data => {
        this.allenamenti = data;},
      error: err => console.error('Errore caricamento allenamenti', err)
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  selezionaSquadra(id: string) {
    this.idSquadraSelezionata = this.idSquadraSelezionata === id ? '' : id;
  }

  isSelected(id: string): boolean {
    return this.idSquadraSelezionata === id;
  }

  creaAllenamento() {
    this.nuovoAllenamento.id_squadra = this.idSquadraSelezionata;

    const { id_squadra, data_inizio, data_fine } = this.nuovoAllenamento;

    if (!id_squadra || !data_inizio || !data_fine) {
      alert('Compila tutti i campi');
      return;
    }

    this.http.post<any>('/api/allenamento', this.nuovoAllenamento).subscribe({
      next: (allenamento) => {
        this.allenamenti.push(allenamento);
        this.resetForm();
      },
      error: err => console.error('Errore creazione allenamento', err)
    });
  }

  resetForm() {
    this.nuovoAllenamento = { id_squadra: '', data_inizio: '', data_fine: '' };
    this.idSquadraSelezionata = '';
    this.showForm = false;
  }

  filtraAllenamenti() {
    if (!this.filtroInizio || !this.filtroFine) {
      alert('Inserisci entrambe le date di filtro');
      return;
    }

    this.http.get<any[]>(`/api/allenamenti/date?data_inizio=${this.filtroInizio}&data_fine=${this.filtroFine}`).subscribe({
      next: data => this.allenamenti = data,
      error: err => console.error('Errore filtro allenamenti', err)
    });
  }

  getNomeSquadra(id: string): string {
    const squadra = this.squadre.find(s => s.id === id);
    return squadra ? squadra.name:squadra.name;
  }
}
