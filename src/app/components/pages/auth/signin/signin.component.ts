import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { customPasswordValidator } from './signin.validator';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, NavbarComponent ,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  formSingin: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formSingin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, customPasswordValidator()]]
    })
  }
  onSubmit() {
    if (this.formSingin.valid) {
      console.log('Formulario válido:', this.formSingin.value);
    } else {
      console.log('Formulario inválido:', this.formSingin.errors);
    }
  }
}
