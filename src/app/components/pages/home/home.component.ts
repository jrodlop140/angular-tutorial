import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileComponent } from "../../dashboard/profile/profile.component";
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
