import { CriarFilmes } from './../../models/criar-filmes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-filme',
  templateUrl: './dialog-filme.component.html',
  styleUrls: ['./dialog-filme.component.scss'],
})
export class DialogFilmeComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFilmeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CriarFilmes
  ) {}

  ngOnInit(): void {
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
