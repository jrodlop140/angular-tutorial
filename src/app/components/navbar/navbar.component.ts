import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {

  }

  redireccion() {
    this.router.navigate(['/notfound'])
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onClick() {
    this.authService.logout()
      .then(response => {
        console.log(response)
        this.router.navigate(['/login'])
      })
      .catch(error => console.log(error))
  }

}
