import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from '../../navbar/navbar.component';
import { TaskresumeComponent } from "../../task/taskresume/taskresume.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, TaskresumeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
