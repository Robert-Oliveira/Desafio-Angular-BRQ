import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CriarGenero } from 'src/app/models/criar-genero';

@Component({
  selector: 'app-dialog-genero',
  templateUrl: './dialog-genero.component.html',
  styleUrls: ['./dialog-genero.component.scss'],
})
export class DialogGeneroComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogGeneroComponent>,
    public openDialog: MatDialogRef<DialogGeneroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CriarGenero
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      nome: ['', [Validators.required]],
    });
    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['nome'].setValue(this.data.nome);
  }
  updateGenero() {
    let genero: CriarGenero = {
      id: this.form.controls['id'].value,
      nome: this.form.controls['nome'].value,
    };
    this.data.id = this.form.controls['id'].value;
    this.data.nome = this.form.controls['nome'].value;
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.openDialog.close();
  }
}
