import { CriarFilmes } from './../../models/criar-filmes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalvarGeneroService } from 'src/app/services/genero-service';
import { CriarGenero } from 'src/app/models/criar-genero';

@Component({
  selector: 'app-dialog-filme',
  templateUrl: './dialog-filme.component.html',
  styleUrls: ['./dialog-filme.component.scss'],
})
export class DialogFilmeComponent implements OnInit {
  public form!: FormGroup;
  generos!: CriarGenero[];

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFilmeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CriarFilmes,
    private salvarGeneroService: SalvarGeneroService
  ) {}

  ngOnInit(): void {
    this.salvarGeneroService.lerGeneros().subscribe({
      next: (generos: CriarGenero[]) => {
        this.generos = generos;
      },
      error: () => {
        console.log('error');
      },
    });

    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      genero: ['', [Validators.required]],
    });
    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['nome'].setValue(this.data.filme);
    this.form.controls['genero'].setValue(this.data.genero);
    console.log(this.data.filme);
  }
  updateFilme() {
    let filme: CriarFilmes = {
      id: this.form.controls['id'].value,
      filme: this.form.controls['nome'].value,
      genero: this.form.controls['genero'].value,
    };
    this.data.id = this.form.controls['id'].value;
    this.data.filme = this.form.controls['nome'].value;
    this.data.genero = this.form.controls['genero'].value;
    this.dialogRef.close(this.data);
    this.form.reset();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
