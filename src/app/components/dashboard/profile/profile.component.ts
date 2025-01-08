import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person.model';
import { AuthService } from '../../../services/auth.service';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  // Fixed typo
})
export class ProfileComponent implements OnInit {
  user: Person | null = null;

  constructor(private personService: PersonService, private authService: AuthService) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.personService.getPersonByUid(currentUser.uid)
        .then((snapshot: any) => {  
          if (snapshot.exists()) {
            this.user = snapshot.val() as Person;
          }
        })
        .catch((err: any) => {
          console.error('Error al cargar los datos del usuario:', err);
        });
    }
  }
}
