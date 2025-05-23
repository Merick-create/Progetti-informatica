import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atlete-component',
  standalone: false,
  templateUrl: './atlete-component.component.html',
  styleUrls: ['./atlete-component.component.css'] 
})
export class AtleteComponentComponent implements OnInit {
   showAddModal = false;

  atleta = {
    name: '',
    lastname: '',
    age: null,
    rule: '',
    phone_number: '',
    year_subscribe: new Date().getFullYear()
  };

  filteredAtlete: any[] = [];
  filter = {
    age: '',
    rule: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.filterAtlete(); 
  }

  openAddModal() {
    this.showAddModal = true;
  }

  submitForm() {
  this.http.post('/api/add', this.atleta).subscribe({
    next: res => {
      console.log('Atleta aggiunta', res);
      this.showAddModal = false;

      this.atleta = {
        name: '',
        lastname: '',
        age: null,
        rule: '',
        phone_number: '',
        year_subscribe: new Date().getFullYear()
      };

      this.filterAtlete();
    },
    error: err => {
    }
  });
}

  filterAtlete() {
  console.log('Chiamata filterAtlete con filtro:', this.filter);

  let params = new HttpParams();
  if (this.filter.age) {
    params = params.set('age', this.filter.age);
  }
  if (this.filter.rule) {
    params = params.set('rule', this.filter.rule);
  }

  this.http.get<any[]>('/api/filters', { params, observe: 'response' }).subscribe({
    next: response => {
      console.log('Status:', response.status);
      console.log('Body:', response.body);
      this.filteredAtlete = response.body || [];
    },
    error: err => {
      this.filteredAtlete = [];
    }
  });
}
}
