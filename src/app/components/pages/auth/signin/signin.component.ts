import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { customPasswordValidator, customValidatorPassword } from './signin.validator';
import { Router } from '@angular/router';
import { PersonService } from '../../../../services/person.service';
import { UserCredential } from '@angular/fire/auth';
import { Person, Role } from '../../../../models/person.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  formSingin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private personService: PersonService) {
    // Creación del formulario reactivo
    this.formSingin = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, customPasswordValidator()]],
        repeatPassword: ['', [Validators.required]],
        'name': ['', [Validators.required]],
        'surname': ['', [Validators.required]],
        'isAdmin': [false]
      },
      { validators: customValidatorPassword() } // Validador a nivel de grupo
    );
  }

  onSubmit() {
    if (this.formSingin.valid) {
      const name = this.formSingin.get('name')?.value;
      const surname = this.formSingin.get('surname')?.value;
      const email = this.formSingin.get('email')?.value;
      const password = this.formSingin.get('password')?.value;
      const isAdmin = this.formSingin.get('isAdmin')?.value;
      const role = isAdmin ? Role.ADMIN : Role.USER;
      this.authService.register({ email, password })
        .then((userCredential: UserCredential) => {
          const uid = userCredential.user.uid;
          const person: Person = { uid, name, surname, email, role, createAt: new Date().toString() };
          this.personService.savePerson(person)
            .then(() => {
              alert("Usuario Registrado Correctamente")
              this.router.navigate(['/login']);
            })
            .catch((error: any) => console.error('Error al guardar los datos del usuario:', error));
        })
        .catch(error => {
          console.error('Error en el registro:', error);
        });
    }
  }
}
