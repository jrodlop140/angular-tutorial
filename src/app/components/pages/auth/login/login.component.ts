import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { customPasswordValidator } from './login.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formLogin = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, customPasswordValidator()]]
    })
  }

  onSubmit() {
    if (this.formLogin.valid) {
      console.log('Formulario válido:', this.formLogin.value);
    } else {
      console.log('Formulario inválido:', this.formLogin.errors);
    }
  }
}