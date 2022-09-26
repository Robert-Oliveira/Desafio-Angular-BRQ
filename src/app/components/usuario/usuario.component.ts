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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //checar se os campos estão preenchidos de forma válida

    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
    });

    this.salvarUsuarioService.lerUsuarios().subscribe({
      next: (usuarios: CriarUsuario[]) => {
        this.usuarios = usuarios;
      },
      error: () => {
        console.log('falha em salvar');
      },
    });
  }
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

    this.salvarUsuarioService.salvarUsuario(usuario).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: () => {
        console.log('falha');
      },
    });
  }

  deletarUsuario(id: any) {
    this.salvarUsuarioService.deletarUsuario(id).subscribe({
      next: () => {
        console.log('deletou com sucesso');
        this.ngOnInit();
      },
      error: () => {
        console.log('falha em deletar');
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

  openDialog(
    id: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.salvarUsuarioService.lerUsuarioById(id).subscribe({
      //pegar bolo
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
          //data: {name: this.name, animal: this.animal},
        });

        //receber fechamento do dialog
        dialogRef.afterClosed().subscribe((usuario) => {
          this.salvarUsuarioService.updateUsuario(usuario).subscribe({
            next: () => {
              //alert("bolo salvo com sucesso")
              this.ngOnInit();
            },
            error: () => {
              alert('Erro ao salvar Bolo');
            },
          });
        });
      },
      error: () => {
        console.log('erro ao editar bolo');
      },
    });
  }
}
