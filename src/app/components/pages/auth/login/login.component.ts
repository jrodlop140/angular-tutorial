import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { customPasswordValidator } from './login.validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService) {
    this.formLogin = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, customPasswordValidator()]]
    })
  }

  onSubmit() {
    if (this.formLogin.valid) {
      console.log('Formulario válido:', this.formLogin.value)
      this.authService.login(this.formLogin.value).then(response => { console.log(response) }).catch(error => console.log(error))
    } else {
      console.log('Formulario inválido:', this.formLogin.errors);
    }
  }
}