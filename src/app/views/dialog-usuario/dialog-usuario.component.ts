import { CriarUsuario } from './../../models/criar-usuario';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.scss'],
})
export class DialogUsuarioComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public formbuilder: FormBuilder,

    public dialogRef: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CriarUsuario
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      id: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
    });

    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['nome'].setValue(this.data.nome);
    this.form.controls['email'].setValue(this.data.email);
    this.form.controls['telefone'].setValue(this.data.telefone);
  }
  updateUsuario() {
    let usuario: CriarUsuario = {
      id: this.form.controls['id'].value,
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      telefone: this.form.controls['telefone'].value,
    };
    this.data.id = this.form.controls['id'].value;
    this.data.nome = this.form.controls['telefone'].value;
    this.data.email = this.form.controls['email'].value;
    this.data.telefone = this.form.controls['telefone'].value;
    this.dialogRef.close(this.data);
    this.form.reset();
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.form.reset();
  }
}
