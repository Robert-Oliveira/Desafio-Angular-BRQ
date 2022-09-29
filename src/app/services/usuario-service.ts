import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriarUsuario } from '../models/criar-usuario';

@Injectable({
  providedIn: 'root',
})
export class SalvarUsuarioService {
  private listaUsuarios: any[];
  private url = 'http://localhost:3000/usuarios/';

  constructor(private httpClient: HttpClient) {
    this.listaUsuarios = [];
  }

  get usuarios() {
    return this.listaUsuarios;
  } //serviço para ler a lista de usuario
  lerUsuarios(): Observable<CriarUsuario[]> {
    return this.httpClient.get<CriarUsuario[]>(this.url);
  }
  //serviço para salvar um objeto do tipo filme
  salvarUsuario(usuario: CriarUsuario): Observable<CriarUsuario> {
    return this.httpClient.post<CriarUsuario>(this.url, usuario);
  }
  //serviço para deletar um objeto da lista
  deletarUsuario(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  //serviço para atualizar um objeto da lista
  updateUsuario(usuario: CriarUsuario): Observable<CriarUsuario> {
    return this.httpClient.put<CriarUsuario>(
      `${this.url}/${usuario.id}`,
      usuario
    );
  }
  //serviço para pegar um objeto da lista pelo ID
  lerUsuarioById(id: number): Observable<CriarUsuario> {
    return this.httpClient.get<CriarUsuario>(`${this.url}/${id}`);
  }
}
