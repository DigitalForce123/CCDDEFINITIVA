import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  terminoBusqueda: string = '';
  eventosOriginales = [
    { image: 'assets/fondo.png', title: 'Carreras Deportivas', description: 'Disfruta de las carreras al maximo nivel .' },
    { image: 'assets/fondo3.png', title: 'Run Centro 5K', description: 'Disfruta de las carreras al maximo nivel.' },
    { image: 'assets/fondo4.png', title: 'Carreras Recreativas', description: 'Disfruta de las carreras al maximo nivel.' },
    { image: 'assets/fondo5.png', title: 'Carreras', description: 'Disfruta de las carreras al maximo nivel.' },
  ];

  currentIndex = 0;

  eventosDestacados = [
    { image: 'assets/BaloncestoEnFamilia.webp', title: 'Liga Baloncesto', description: 'La mejor liga de baloncesto los sábados.' },
    { image: 'assets/membrete.jpg', title: 'Exposición de Fotografía', description: 'Una galería con los mejores fotógrafos locales.' },
    { image: 'assets/membrete.jpg', title: 'Feria Gastronómica', description: 'Descubre los sabores más exquisitos en esta feria.' }
  ];

  nextEvent() {
    this.currentIndex = (this.currentIndex + 1) % this.eventosDestacados.length;
  }

  prevEvent() {
    this.currentIndex = (this.currentIndex - 1 + this.eventosDestacados.length) % this.eventosDestacados.length;
  }

  eventosFiltrados = [...this.eventosOriginales];

  buscarEventos() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.eventosFiltrados = this.eventosOriginales.filter(evento =>
      evento.title.toLowerCase().includes(termino) || evento.description.toLowerCase().includes(termino)
    );
  }
}
