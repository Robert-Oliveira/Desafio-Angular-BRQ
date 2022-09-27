import { DialogFilmeComponent } from './../../views/dialog-filme/dialog-filme.component';
import { SalvarFilmesService } from '../../services/filme-service';
import { CriarFilmes } from '../../models/criar-filmes';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CriarGenero } from '../../models/criar-genero';
import { SalvarGeneroService } from '../../services/genero-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.scss'],
})
export class FilmeComponent implements OnInit {
  form!: FormGroup;
  error = 'Este campo é obrigatório!';
  errorSelect = 'Selecione uma opção!';
  filme!: CriarFilmes[];
  generos!: CriarGenero[];
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private salvarFilmesService: SalvarFilmesService,
    private salvarGeneroService: SalvarGeneroService
  ) {}

  ngOnInit(): void {
    //checar se os campos estão preenchidos de forma válida
    this.form = this.formBuilder.group({
      nomeFilme: new FormControl('', [Validators.required]),
      select: new FormControl('', [Validators.required]),
    });

    //dados do select
    this.salvarGeneroService.lerGeneros().subscribe({
      next: (generos: CriarGenero[]) => {
        this.generos = generos;
      },
      error: () => {
        console.log('error');
      },
    });
    this.salvarFilmesService.lerFilmes().subscribe({
      next: (filmes: CriarFilmes[]) => {
        this.filme = filmes;
      },
    });
  }

  salvarDadosFilme() {
    const id = this.filme[this.filme.length - 1].id + 1;
    const nomeFilme = this.form.controls['nomeFilme'].value;
    const genero = this.form.controls['select'].value.nome;

    const filme: CriarFilmes = {
      id,
      filme: nomeFilme,
      genero: genero,
    };

    this.salvarFilmesService.salvarFilme(filme).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: () => {
        console.log('error');
      },
    });
  }

  deletarFilme(id: any) {
    this.salvarFilmesService.deletarFilmes(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: () => {
        console.log('error');
      },
    });
  }
  openDialog(
    id: number,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.salvarFilmesService.lerFilmesById(id).subscribe({
      next: (filme: CriarFilmes) => {
        const dialogRef = this.dialog.open(DialogFilmeComponent, {
          width: '250px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: {
            id: filme.id,
            filme: filme.filme,
            genero: filme.genero,
          },
        });
        dialogRef.afterClosed().subscribe((filme) => {
          this.salvarFilmesService.updateFilmes(filme).subscribe({
            next: () => {
              this.ngOnInit();
            },
            error: () => {
              alert('erro ao salvar');
            },
          });
        });
      },
      error: () => {
        console.log('erro ao editar filme');
      },
    });
  }
}
