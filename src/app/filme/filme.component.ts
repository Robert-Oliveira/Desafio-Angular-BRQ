import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.scss'],
})
export class FilmeComponent implements OnInit {
  form!: FormGroup;
  error = 'Este campo é obrigatório!';
  errorSelect = 'Selecione uma opção!';

  toppings = new FormControl('');

  toppingList: string[] = [
    'Terror',
    'Ação',
    'Comédia',
    'Drama',
    'Ficção científica',
    'Suspense',
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeFilme: new FormControl('', [Validators.required]),
      toppingList: new FormControl('', [Validators.required]),
    });
  }

  salvarFilme() {
    console.log('clicou!');
  }
}
