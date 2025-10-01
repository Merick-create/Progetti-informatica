import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-squadra',
  standalone: false,
  templateUrl: './squadra.component.html',
  styleUrls: ['./squadra.component.css']
})
export class SquadraComponent implements OnInit {
  squadre: any[] = [];

  nuovaSquadra = {
    name: '',
    id_atlete: [] as string[]
  };

  squadraDaEliminare: any = null;
  showConfirmDelete: boolean = false;

  elencoAtlete: any[] = [];
  showForm = false;
  showAtleteList = false;
  showEditor = false;
  squadraDaModificare: any = null;
  atleteSelezionateModifica: string[] = [];
  atletaSelezionatoSingolo: any = null;
  messaggioErrore: string = '';

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

  chiediConfermaEliminazione(squadra: any): void {
    this.squadraDaEliminare = squadra;
    this.showConfirmDelete = true;
  }

  annullaEliminazione(): void {
    this.squadraDaEliminare = null;
    this.showConfirmDelete = false;
  }

  confermaEliminazione(): void {
    if (!this.squadraDaEliminare) return;
    const id = this.squadraDaEliminare.id || this.squadraDaEliminare._id;

    this.http.delete(`/api/delete/${id}`).subscribe({
      next: () => {
        this.caricaSquadre();
        this.annullaEliminazione();
      },
      error: err => {
        console.error('Errore eliminazione squadra:', err);
        this.annullaEliminazione();
      }
    });
  }

  apriEditorSquadra(squadra: any): void {
    this.squadraDaModificare = { ...squadra };
    this.atleteSelezionateModifica = [...(squadra.id_atlete || [])];
    this.showEditor = true;
  }

  isSelezionataInModifica(atletaId: string): boolean {
    return this.atleteSelezionateModifica.includes(atletaId);
  }

  toggleAtletaModifica(atletaId: string): void {
    const index = this.atleteSelezionateModifica.indexOf(atletaId);
    if (index === -1) {
      this.atleteSelezionateModifica.push(atletaId);
    } else {
      this.atleteSelezionateModifica.splice(index, 1);
    }
  }

  salvaModificheSquadra(): void {
    if (!this.squadraDaModificare) return;

    // Sostituisco l'intera lista di atlete senza controlli
    const squadraId: string = this.squadraDaModificare._id || this.squadraDaModificare.id;
    if (!squadraId) {
      console.error('ID squadra non valido');
      return;
    }

    const body = { id_atlete: this.atleteSelezionateModifica };

    this.http.patch(`/api/squadre/${squadraId}`, body).subscribe({
      next: () => {
        this.caricaSquadre();
        this.squadraDaModificare = null;
        this.atleteSelezionateModifica = [];
        this.showEditor = false;
      },
      error: err => console.error('Errore durante modifica squadra:', err)
    });
  }

  selezionaAtletaSingolo(atleta: any): void {
    this.atletaSelezionatoSingolo = atleta;
    // Rimuovo messaggi di errore o controllo duplicati
    this.messaggioErrore = '';
  }

  aggiungiAtletaSingolo(): void {
    if (!this.atletaSelezionatoSingolo) return;
    const atletaId = this.atletaSelezionatoSingolo._id;
    const squadraId = this.squadraDaModificare._id || this.squadraDaModificare.id;

    this.http.patch(`/api/squadre/${squadraId}/aggiungi-atleta/${atletaId}`, {}).subscribe({
      next: () => {
        this.messaggioErrore = '✅ Atleta aggiunta con successo.';
        this.caricaSquadre();
      },
      error: err => {
        this.messaggioErrore = 'Errore durante aggiunta.';
        console.error(err);
      }
    });
  }

  rimuoviAtletaSingolo(): void {
    if (!this.atletaSelezionatoSingolo) return;
    const atletaId = this.atletaSelezionatoSingolo._id;
    const squadraId = this.squadraDaModificare._id || this.squadraDaModificare.id;

    this.http.patch(`/api/squadre/${squadraId}/rimuovi-atleta/${atletaId}`, {}).subscribe({
      next: () => {
        this.messaggioErrore = '🗑️ Atleta rimossa con successo.';
        this.caricaSquadre();
      },
      error: err => {
        this.messaggioErrore = 'Errore durante la rimozione.';
        console.error(err);
      }
    });
  }
}
  