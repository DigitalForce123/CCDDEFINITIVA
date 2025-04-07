// src/app/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/servicios/event.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  terminoBusqueda: string = '';
  eventosOriginales: any[] = [];
  eventosFiltrados: any[] = [];

  currentIndex = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getUpcomingEvents().subscribe((eventos) => {
      this.eventosOriginales = eventos.map(e => ({
        id: e.id,
        image: e.thumbnailImage, // la miniatura que quieres en la card
        title: e.name,
        description: e.description,
        fullEvent: e // guardar el evento completo si lo necesitas para la navegación
      }));
      this.eventosFiltrados = [...this.eventosOriginales];
    });
  }

  buscarEventos() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.eventosFiltrados = this.eventosOriginales.filter(evento =>
      evento.title.toLowerCase().includes(termino) || evento.description.toLowerCase().includes(termino)
    );
  }

  nextEvent() {
    this.currentIndex = (this.currentIndex + 1) % this.eventosFiltrados.length;
  }

  prevEvent() {
    this.currentIndex = (this.currentIndex - 1 + this.eventosFiltrados.length) % this.eventosFiltrados.length;
  }
}
