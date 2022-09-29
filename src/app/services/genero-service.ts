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
  //serviço para ler a lista de genero
  lerGeneros(): Observable<CriarGenero[]> {
    return this.httpClient.get<CriarGenero[]>(this.url);
  }
  //serviço para salvar um objeto do tipo filme
  salvarGenero(genero: CriarGenero): Observable<CriarGenero> {
    return this.httpClient.post<CriarGenero>(this.url, genero);
  }
  //serviço para deletar um objeto da lista
  deletarGenero(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  //serviço para atualizar um objeto da lista
  updateGenero(genero: CriarGenero): Observable<CriarGenero> {
    return this.httpClient.put<CriarGenero>(`${this.url}/${genero.id}`, genero);
  }
  //serviço para pegar um objeto da lista pelo ID
  lerGenerosById(id: number): Observable<CriarGenero> {
    return this.httpClient.get<CriarGenero>(`${this.url}/${id}`);
  }
}
