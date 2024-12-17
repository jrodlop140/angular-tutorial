import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { customPasswordValidator, customValidatorPassword } from './signin.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formSingin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Creación del formulario reactivo
    this.formSingin = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, customPasswordValidator()]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: customValidatorPassword() } // Validador a nivel de grupo
    );
  }

  onSubmit() {
    if (this.formSingin.valid) {
      console.log("Formulario Valido")
      this.authService.register(this.formSingin.value)
        .then(response => {
          console.log(response);
          this.router.navigate(['/login'])

        })
        .catch(error => console.log(error))

    }
  }
}
