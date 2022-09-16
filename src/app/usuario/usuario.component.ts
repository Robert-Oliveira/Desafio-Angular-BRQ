import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  form!: FormGroup;
  error = 'Este campo é obrigatório!';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //checar se os campos estão preenchidos de forma válida

    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
    });
  }
  salvarDadosCliente() {
    console.log('clicou!');
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
}
