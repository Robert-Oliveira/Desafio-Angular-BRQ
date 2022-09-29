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
  //serviço para ler a lista de filmes
  lerFilmes(): Observable<CriarFilmes[]> {
    return this.httpClient.get<CriarFilmes[]>(this.url);
  }
  //serviço para ler a lista de genero
  lerGeneros(): Observable<CriarGenero[]> {
    return this.httpClient.get<CriarGenero[]>(this.urlGenero);
  }
  //serviço para salvar um objeto do tipo filme
  salvarFilme(filme: CriarFilmes): Observable<CriarFilmes> {
    return this.httpClient.post<CriarFilmes>(this.url, filme);
  }
  //serviço para deletar um objeto da lista
  deletarFilmes(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  //serviço para atualizar um objeto da lista
  updateFilmes(filme: CriarFilmes) {
    return this.httpClient.put<CriarFilmes>(`${this.url}/${filme.id}`, filme);
  }
  //serviço para pegar um objeto da lista pelo ID
  lerFilmesById(id: number): Observable<CriarFilmes> {
    return this.httpClient.get<CriarFilmes>(`${this.url}/${id}`);
  }
}
