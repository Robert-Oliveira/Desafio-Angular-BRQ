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
  }
  lerUsuarios(): Observable<CriarUsuario[]> {
    return this.httpClient.get<CriarUsuario[]>(this.url);
  }
  salvarUsuario(usuario: CriarUsuario): Observable<CriarUsuario> {
    return this.httpClient.post<CriarUsuario>(this.url, usuario);
  }
  deletarUsuario(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  updateUsuario(usuario: CriarUsuario): Observable<CriarUsuario> {
    return this.httpClient.put<CriarUsuario>(
      `${this.url}/${usuario.id}`,
      usuario
    );
  }
  lerUsuarioById(id: number): Observable<CriarUsuario> {
    return this.httpClient.get<CriarUsuario>(`${this.url}/${id}`);
  }
}
