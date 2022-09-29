import { SalvarUsuarioService } from '../../services/usuario-service';
import { CriarUsuario } from '../../models/criar-usuario';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuarioComponent } from 'src/app/views/dialog-usuario/dialog-usuario.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  form!: FormGroup;
  error = 'Este campo é obrigatório!';
  usuarios!: CriarUsuario[];
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private salvarUsuarioService: SalvarUsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //checar se os campos estão preenchidos de forma válida
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
    });
    //dados para lista de usuario gerado atraves do banco de dados de usuario
    this.salvarUsuarioService.lerUsuarios().subscribe({
      next: (usuarios: CriarUsuario[]) => {
        this.usuarios = usuarios;
      },
      error: () => {
        console.log('falha em salvar');
      },
    });
  }
  //Função para salvar os dados do formulario
  salvarDadosUsuario() {
    const id = this.usuarios[this.usuarios.length - 1].id + 1;
    const nome = this.form.controls['nome'].value;
    const email = this.form.controls['email'].value;
    const telefone = this.form.controls['telefone'].value;

    const usuario: CriarUsuario = {
      id,
      nome: nome,
      email: email,
      telefone: telefone,
    };
    // chama a função salvar da service e dispara o snackBar
    this.salvarUsuarioService.salvarUsuario(usuario).subscribe({
      next: () => {
        this.alertaDados('salvoSucesso');
        this.ngOnInit();
      },
      error: () => {
        this.alertaDados('erroSalvar');
      },
    });
  }
  // função para deletar um item da lista e disparar o snackBar
  deletarUsuario(id: any) {
    this.salvarUsuarioService.deletarUsuario(id).subscribe({
      next: () => {
        this.alertaDados('excluido');
        this.ngOnInit();
      },
      error: () => {
        this.alertaDados('erroExcluir');
      },
    });
  }

  //condições para considerar o campo email válido
  validaEmail(): String {
    if (this.form.controls['email'].hasError('required')) {
      return this.error;
    }
    return this.form.controls['email'].hasError('email')
      ? 'E-mail inválido'
      : '';
  }
  //função para enviar os dados para o dialog que abre no botão editar
  openDialog(
    id: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.salvarUsuarioService.lerUsuarioById(id).subscribe({
      //pegar usuario
      next: (usuario: CriarUsuario) => {
        //abir o dialog
        const dialogRef = this.dialog.open(DialogUsuarioComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
          },
        });
        //após fechar o dialog ele checa se o usuario esta enviando algum dado ou se ele apenas saiu do modal
        dialogRef.afterClosed().subscribe((usuario) => {
          if (usuario) {
            //faz o update com os dados recebidos do dailog e disparar o snackBar
            this.salvarUsuarioService.updateUsuario(usuario).subscribe({
              next: () => {
                this.ngOnInit();
                this.alertaDados('alteracaoSalva');
              },
              error: () => {
                this.alertaDados('erroEditar');
              },
            });
          }
        });
      },
      error: () => {
        this.alertaDados('erroEditar');
      },
    });
  }
  // função que pega o tipo de alerta e disparar uma msg no snackBar
  alertaDados(tipoAlerta: String) {
    switch (tipoAlerta) {
      case 'salvoSucesso':
        this.snackBar.open('Dados salvos com sucesso!', undefined, {
          duration: 2000,
          panelClass: 'snackbar-tema',
        });
        break;
      case 'erroSalvar':
        this.snackBar.open('Nenhum dados foi salvo!', undefined, {
          duration: 2000,
          panelClass: 'snackbar-tema',
        });
        break;
      case 'alteracaoSalva':
        this.snackBar.open('Alterações salvas com sucesso!', undefined, {
          duration: 2000,
          panelClass: 'snackbar-tema',
        });
        break;
      case 'erroEditar':
        this.snackBar.open('Nenhuma alteração realizada!', undefined, {
          duration: 2000,
          panelClass: 'snackbar-tema',
        });
        break;
      case 'excluido':
        this.snackBar.open('Excluido com sucesso!', undefined, {
          panelClass: 'snackbar-tema',
          duration: 2000,
        });
        break;
      case 'erroExcluir':
        this.snackBar.open('Não foi possivel excluir!', undefined, {
          panelClass: 'snackbar-tema',
          duration: 2000,
        });
        break;
    }
  }
}
