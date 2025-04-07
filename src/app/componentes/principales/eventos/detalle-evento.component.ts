import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/servicios/event.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit {
  event: any;
  showMap = false;
  safeMapUrl: SafeResourceUrl = '';

  // 🟠 Lógica de Modales y Tickets
  showLoader = false;
  showTicketModal = false;
  showFormModal = false;

  availableTickets = [
    { id: 1, name: 'Ascenso a la Torre de Cali', price: 75000, quantity: 0 },
    { id: 2, name: 'Chiquirun 2K', price: 75000, quantity: 0 }
  ];

  selectedTickets: any[] = [];
  ticketForms: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventosService.getEventoById(id).subscribe(evento => {
        this.event = evento;
      });
    }
  }

  toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      const encodedLocation = encodeURIComponent(this.event.location);
      const url = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  // 🔘 Mostrar loader y luego pasar a selección
  comprarETicket() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showTicketModal = true;
    }, 1500); // 1.5 segundos de "carga"
  }

  increaseQuantity(ticket: any) {
    ticket.quantity = (ticket.quantity || 0) + 1;
    this.syncSelectedTickets();
  }

  decreaseQuantity(ticket: any) {
    if (ticket.quantity && ticket.quantity > 0) {
      ticket.quantity--;
      this.syncSelectedTickets();
    }
  }

  syncSelectedTickets() {
    this.selectedTickets = this.availableTickets.filter(t => t.quantity && t.quantity > 0);
  }

  removeTicket(ticket: any) {
    ticket.quantity = 0;
    this.syncSelectedTickets();
  }

  getTotal(): number {
    return this.selectedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  }

  continuarConFormulario() {
    this.ticketForms = [];

    this.selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        this.ticketForms.push({
          name: '',
          email: ''
        });
      }
    });

    this.showTicketModal = false;
    this.showFormModal = true;
  }
}
