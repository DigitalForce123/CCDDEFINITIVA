import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/servicios/event.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AfterViewInit, Renderer2, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';

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

  currentStep = 1; // 1 = Tickets - 2 = Datos - 3 = Pago

  @ViewChild('form', { static: true }) formRef!: ElementRef;
  @ViewChildren('step') steps!: QueryList<ElementRef>;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;

  availableTickets = [
/*     { id: 1, name: 'Ascenso a la Torre de Cali', price: 75000, quantity: 0 },
    { id: 2, name: 'Chiquirun 2K', price: 75000, quantity: 0 } */
  ];

  selectedTickets: any[] = [];
  ticketForms: any[] = [];

  currentFormIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.steps.forEach((step, index) => {
      if (index !== 0) {
        this.renderer.setStyle(step.nativeElement, 'display', 'none');
      }
    });
  }

  displayStep(stepNumber: number): void {
    if (stepNumber >= 1 && stepNumber <= 3) {
      const stepsArray = this.steps.toArray();

      // Oculta el paso actual
      stepsArray[this.currentStep - 1].nativeElement.style.display = 'none';

      // Muestra el nuevo paso
      stepsArray[stepNumber - 1].nativeElement.style.display = 'block';

      this.currentStep = stepNumber;
      this.updateProgressBar();
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      const current = this.steps.get(this.currentStep - 1)?.nativeElement;
      this.renderer.addClass(current, 'animate__animated');
      this.renderer.addClass(current, 'animate__fadeOutLeft');

      setTimeout(() => {
        this.steps.forEach(step => this.renderer.setStyle(step.nativeElement, 'display', 'none'));
        const next = this.steps.get(this.currentStep)?.nativeElement;
        this.renderer.setStyle(next, 'display', 'block');
        this.renderer.addClass(next, 'animate__animated');
        this.renderer.addClass(next, 'animate__fadeInRight');

        this.currentStep++;
        this.updateProgressBar();
      }, 500);
    }
    this.continuarConFormulario(); // Esto ya hace todo lo necesario
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      const current = this.steps.get(this.currentStep - 1)?.nativeElement;
      this.renderer.addClass(current, 'animate__animated');
      this.renderer.addClass(current, 'animate__fadeOutRight');

      setTimeout(() => {
        this.steps.forEach(step => this.renderer.setStyle(step.nativeElement, 'display', 'none'));
        const prev = this.steps.get(this.currentStep - 2)?.nativeElement;
        this.renderer.setStyle(prev, 'display', 'block');
        this.renderer.addClass(prev, 'animate__animated');
        this.renderer.addClass(prev, 'animate__fadeInLeft');

        this.currentStep--;
        this.updateProgressBar();
      }, 500);
    }
  }

  updateProgressBar(): void {
    const progressPercentage = ((this.currentStep - 1) / 2) * 100;
    this.renderer.setStyle(this.progressBar.nativeElement, 'width', `${progressPercentage}%`);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventosService.getEventoById(id).subscribe(evento => {
        this.event = evento;
        this.availableTickets = evento.tickets.map(ticket => ({
          id: ticket.tipo,  // Utilizamos el tipo como identificador
          name: ticket.tipo,
          price: ticket.valor,
          available: ticket.disponibles - ticket.seleccionados,
          selected: 0,
          quantity: 0
        }));
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

  get currentTicketForm() {
    return this.ticketForms[this.currentFormIndex];
  }

  get isLastForm() {
    return this.currentFormIndex === this.ticketForms.length - 1;
  }

  nextForm() {
    if (this.currentFormIndex < this.ticketForms.length - 1) {
      this.currentFormIndex++;
    }
  }

  previousForm() {
    if (this.currentFormIndex > 0) {
      this.currentFormIndex--;
    }
  }

  irAlPago() {
    this.actualizarParticipantes(); // Llamada para actualizar los participantes
    this.currentStep = 3;
    this.showFormModal = false;
    // Lógica adicional para pasar al modal de pago...
  }
  // 🔘 Mostrar loader y luego pasar a selección
  comprarETicket() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showTicketModal = true;
      this.currentStep = 1;
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

  volverASeleccion() {
    this.showFormModal = false;
    this.showTicketModal = true;
    this.currentStep = 1;
  }

  get progressWidth(): string {
    const totalSteps = 3;
    return ((this.currentStep - 1) / (totalSteps - 1)) * 100 + '%';
  }

  continuarConFormulario() {
    this.ticketForms = [];

    this.selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        this.ticketForms.push({
          name: '',
          email: '',
          tipo: ticket.name  // 🟢 Añadimos el tipo de ticket
        });
      }
    });

    this.showTicketModal = false;
    this.showFormModal = true;
    this.currentStep = 2;
  }

  actualizarParticipantes() {
    // Crear un nuevo array de participantes con la información necesaria
    const participantes = this.ticketForms.map(form => ({
      name: form.name,
      email: form.email,
      tipo: form.tipo
    }));

    // Agregar los participantes al evento
    const updatedEvent = {
      ...this.event, // Mantener todos los datos actuales del evento
      participants: [...(this.event.participants || []), ...participantes] // Agregar los nuevos participantes sin reemplazar los existentes
    };

    console.log("updated event", updatedEvent)
    // Hacer la petición al backend para actualizar el evento completo
    this.eventosService.actualizarEventoConParticipantes(updatedEvent).subscribe(
      (response) => {
        console.log('Evento y participantes actualizados correctamente');
        // Puedes redirigir a otra página o mostrar un mensaje
      },
      (error) => {
        console.error('Error al actualizar el evento y participantes', error);
      }
    );
  }


}
