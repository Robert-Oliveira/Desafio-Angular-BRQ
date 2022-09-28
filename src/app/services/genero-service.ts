import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarGenero } from '../models/criar-genero';

@Injectable({
  providedIn: 'root',
})
export class SalvarGeneroService {
  private listaGenero: any;

  private url = 'http://localhost:3000/generos';

  constructor(private httpClient: HttpClient) {
    this.listaGenero = [];
  }

  get generos() {
    return this.listaGenero;
  }
  set generos(genero: CriarGenero) {
    this.listaGenero.push(genero);
  }

  lerGeneros(): Observable<CriarGenero[]> {
    return this.httpClient.get<CriarGenero[]>(this.url);
  }

  salvarGenero(genero: CriarGenero): Observable<CriarGenero> {
    return this.httpClient.post<CriarGenero>(this.url, genero);
  }
  deletarGenero(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  updateGenero(genero: CriarGenero): Observable<CriarGenero> {
    return this.httpClient.put<CriarGenero>(`${this.url}/${genero.id}`, genero);
  }
  lerGenerosById(id: number): Observable<CriarGenero> {
    return this.httpClient.get<CriarGenero>(`${this.url}/${id}`);
  }
}
