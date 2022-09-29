import { CriarGenero } from './../models/criar-genero';
import { CriarFilmes } from './../models/criar-filmes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalvarFilmesService {
  private listaFilmes: any;

  private url = 'http://localhost:3000/filmes';
  private urlGenero = 'http://localhost:3000/generos';

  constructor(private httpClient: HttpClient) {}

  get filmes() {
    return this.listaFilmes;
  }
  set filmes(filmes: CriarFilmes) {
    this.listaFilmes.push(filmes);
  }
  lerFilmes(): Observable<CriarFilmes[]> {
    return this.httpClient.get<CriarFilmes[]>(this.url);
  }

  lerGeneros(): Observable<CriarGenero[]> {
    return this.httpClient.get<CriarGenero[]>(this.urlGenero);
  }

  salvarFilme(filme: CriarFilmes): Observable<CriarFilmes> {
    return this.httpClient.post<CriarFilmes>(this.url, filme);
  }
  deletarFilmes(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  updateFilmes(filme: CriarFilmes) {
    return this.httpClient.put<CriarFilmes>(`${this.url}/${filme.id}`, filme);
  }

  lerFilmesById(id: number): Observable<CriarFilmes> {
    return this.httpClient.get<CriarFilmes>(`${this.url}/${id}`);
  }
}
