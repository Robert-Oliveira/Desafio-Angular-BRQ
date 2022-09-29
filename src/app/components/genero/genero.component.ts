import { DialogGeneroComponent } from './../../views/dialog-genero/dialog-genero.component';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CriarGenero } from 'src/app/models/criar-genero';
import { SalvarGeneroService } from 'src/app/services/genero-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss'],
})
export class GeneroComponent implements OnInit {
  form!: FormGroup;
  error = 'Este campo é obrigatório!';
  generos!: CriarGenero[];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private salvarGeneroService: SalvarGeneroService
  ) {}

  ngOnInit(): void {
    //checar se os campos estão preenchidos de forma válida
    this.form = this.formBuilder.group({
      genero: new FormControl('', [Validators.required]),
    });
    //dados para lista de genero gerado atraves do banco de dados de genero
    this.salvarGeneroService.lerGeneros().subscribe({
      next: (generos: CriarGenero[]) => {
        this.generos = generos;
      },
      error: () => {
        console.log('error');
      },
    });
  }
  //Função para salvar os dados do formulario
  salvarDadosGenero() {
    const id = this.generos[this.generos.length - 1].id + 1;
    const genero = this.form.controls['genero'].value;

    const tipoFilme: CriarGenero = {
      id,
      nome: genero,
    };
    // chama a função salvar da service e dispara o snackBar
    this.salvarGeneroService.salvarGenero(tipoFilme).subscribe({
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
  deletarGenero(id: any) {
    this.salvarGeneroService.deletarGenero(id).subscribe({
      next: () => {
        this.alertaDados('excluido');
        this.ngOnInit();
      },
      error: () => {
        this.alertaDados('erroExcluir');
      },
    });
  }
  //função para enviar os dados para o dialog que abre no botão editar
  openDialog(
    id: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.salvarGeneroService.lerGenerosById(id).subscribe({
      next: (genero: CriarGenero) => {
        const dialogRef = this.dialog.open(DialogGeneroComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { id: genero.id, nome: genero.nome },
        });
        //após fechar o dialog ele checa se o usuario esta enviando algum dado ou se ele apenas saiu do modal
        dialogRef.afterClosed().subscribe((genero) => {
          if (genero) {
            //faz o update com os dados recebidos do dailog e disparar o snackBar
            this.salvarGeneroService.updateGenero(genero).subscribe({
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
