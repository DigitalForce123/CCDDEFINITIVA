import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  terminoBusqueda: string = '';
  eventosOriginales = [
    { image: 'assets/membrete.jpg', title: 'Concierto en Vivo', description: 'Disfruta de la mejor música en vivo este fin de semana.' },
    { image: 'assets/membrete.jpg', title: 'Exposición de Arte', description: 'Sumérgete en el mundo del arte moderno y clásico.' },
    { image: 'assets/membrete.jpg', title: 'Conferencia Tecnológica', description: 'Aprende sobre las últimas innovaciones tecnológicas.' },
    { image: 'assets/membrete.jpg', title: 'Conferencia Tecnológica', description: 'Aprende sobre las últimas innovaciones tecnológicas.' },
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
