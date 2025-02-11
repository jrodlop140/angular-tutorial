import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nombre = " ";
  imagenAleatoria:string=""
  numero:number =0;

  //Método que muestra una imagen aleatoria al pulsar unb otón en el html
  muestraImagen() {
    let random:number;
    random = Math.round((Math.random()*1000)+100);
    this.imagenAleatoria = "https://picsum.photos/200/300?random="+random
  }

}
