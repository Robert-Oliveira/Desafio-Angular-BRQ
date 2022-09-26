import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CriarGenero } from 'src/app/models/criar-genero';
import { SalvarGeneroService } from 'src/app/services/genero-service';
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
    private salvarGeneroService: SalvarGeneroService
  ) {}

  ngOnInit(): void {
    //checar se os campos estão preenchidos de forma válida

    this.form = this.formBuilder.group({
      genero: new FormControl('', [Validators.required]),
    });

    this.salvarGeneroService.lerGeneros().subscribe({
      next: (generos: CriarGenero[]) => {
        this.generos = generos;
      },
      error: () => {
        console.log('error');
      },
    });
  }
  salvarDadosGenero() {
    const id = this.generos[this.generos.length - 1].id + 1;
    const genero = this.form.controls['genero'].value;

    const tipoFilme: CriarGenero = {
      id,
      nome: genero,
    };

    this.salvarGeneroService.salvarGenero(tipoFilme).subscribe({
      next: () => {
        console.log(id);
        this.ngOnInit();
      },
      error: () => {
        console.log('falha');
      },
    });
  }

  deletarGenero(id: any) {
    this.salvarGeneroService.deletarGenero(id).subscribe({
      next: () => {
        console.log('deletou com sucesso');
        this.ngOnInit();
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
