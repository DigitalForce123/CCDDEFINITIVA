import { Component, OnInit } from '@angular/core';
import {UsuarioDto  } from '../../../../../modelos/usuario-dto';
import { RegaloDto } from '../../../../../modelos/regalo-dto';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
declare var window: any;
import { CarreraService } from '../../../../../servicios/carrera.service';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import { empty } from 'rxjs';

@Component({
  selector: 'app-iniciocarrera',
  templateUrl: './iniciocarrera.component.html',
  styleUrls: ['./iniciocarrera.component.css']
})
export class IniciocarreraComponent  implements OnInit {
  isLoading: boolean = false; // booleano para detectar cuándo salta el loading
  usuarioDto: UsuarioDto[] = [];
  usuarioDto1: UsuarioDto[] = [];
  nuevoregaloDto1: RegaloDto[] = []

  formModal: any;
  formModal1: any;



  nuevoUsuario: UsuarioDto = { variable1: '', variable2: '', variable3: '', variable4: '', variable5: '', variable6: '', variable7: '', variable8: '', variable9: '', variable10: '', variable11: '', variable12: '', variable13: '', variable14: '', variable15: '', variable16: '', evento: 'carrera5k', };

  nuevoregalo: RegaloDto = {  codigoregalo: '', idusuariofin: '', idadminfin: '', numero: '' };
  numero1 = ""
  identificacion = ""
  idadulto = ""
  regalo = ""
  sesion: any





  constructor(
    private carreraService: CarreraService, private router: Router) {

  }




  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );

    this.sesion = localStorage.getItem('carrera')



  }







  public validarcedula() {

    this.nuevoUsuario.variable1= this.idadulto



    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('Identificacion no diligenciada')
    }

    else {
      this.carreraService.GetCupoRegalo(this.nuevoUsuario).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.usuarioDto1 = data.payload;
            this.formModal.show();




          } else {

            Swal.fire(data.payload.message)
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')

        }
      );








    }

  }



  public validarnumero(group: UsuarioDto) {
    this.nuevoregalo.numero=this.numero1
    this.nuevoregalo.idadminfin = 'carrera'
    this.nuevoregalo.idusuariofin = group.variable1
    this.nuevoregalo.codigoregalo = group.evento+" "+group.variable2
    console.log(this.nuevoregalo)

    this.carreraService.createcarrera(this.nuevoregalo).subscribe(
      (data: any) => {

        if (data.status == 200) {

          Swal.fire('Felicidades reclamaste tu Kit con el codigo # ' + this.nuevoregalo.numero + " Con el administrador de la sesion " + this.nuevoregalo.idadminfin)

          this.formModal.hide();




        } else {
          this.idadulto = ""

          Swal.fire(data.payload.message)
        }
      }, (error) => {
        console.log(error);
        Swal.fire('error al intentar registrate por favor intentalo mas tarde')

      }
    );
  }
  public crearregalo() {

    this.nuevoregalo.numero = this.obtenerHoraActual();
    console.log(this.nuevoregalo.numero)
    this.isLoading = true;
    this.carreraService.createregalo(this.nuevoregalo).subscribe(
      (data: any) => {

        this.isLoading = false;

        if (data.status == 200) {

          Swal.fire('Felicidades reclamaste tu regalo en la fecha de  ' + this.nuevoregalo.numero + " Con el administrador de la sesion =" + this.nuevoregalo.idadminfin)




        } else {
          this.idadulto = ""

          Swal.fire(data.payload.message)
        }
      }, (error) => {
        console.log(error);
        Swal.fire('error al intentar registrate por favor intentalo mas tarde')

      }
    );
  }

    public reclamarpremio(group: UsuarioDto) {




    this.nuevoUsuario.variable1 = group.variable1
    this.nuevoUsuario.idusuario = group.idusuario



    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('Identificacion no diligenciada')
    }


    else {

      this.isLoading = true;

      this.carreraService.entregarregalo(this.nuevoUsuario).subscribe(
        (data: any) => {
          this.isLoading = false;


          if (data.status == 200) {
            this.identificacion = ""
            this.regalo = ""
            this.idadulto = ""
            this.nuevoregalo.codigoregalo = group.variable1
            this.nuevoregalo.idadminfin = this.sesion
            this.nuevoregalo.idusuariofin = String(group.idusuario)
            this.nuevoregalo.numero = group.variable20
            console.log(this.nuevoregalo)
            console.log(this.nuevoUsuario)
            this.crearregalo()
            this.formModal.hide();


          } else {

            Swal.fire(data.payload.message)
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')

        }
      );








    }

  }
  public obtenerHoraActual(): string {
    const fechaActual = new Date();
    return fechaActual.toLocaleString(); // Devuelve la hora en formato legible
  }



  public entregarregalo() {

    this.nuevoUsuario.variable1 = this.identificacion



    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('Identificacion no diligenciada')
    }



    else {
      this.isLoading = true;
      this.carreraService.GetRegalopersonamenor(this.nuevoUsuario).subscribe(
        (data: any) => {
          this.isLoading = false;

          if (data.status == 200) {
            this.usuarioDto1 = data.payload;
            this.formModal.show();
            console.log(this.nuevoUsuario)



          } else {

            Swal.fire(data.payload.message)
            console.log(this.nuevoUsuario)
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')
          console.log(this.nuevoUsuario)

        }
      );








    }

  }

}










