import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './componentes/principales/inicio/inicio.component';
import { ContactoComponent } from './componentes/principales/contacto/contacto.component';

import { CarreraComponent } from './componentes/carrera/carrera/carrera.component';
import { CarreravalidarComponent } from './componentes/carrera/carreravalidar/carreravalidar.component';
import { CarreraregistrarcodigoComponent } from './componentes/carrera/carreraregistrarcodigo/carreraregistrarcodigo.component';
import { CarreraregistrarlibreComponent } from './componentes/carrera/carreraregistrarlibre/carreraregistrarlibre.component';
import { CiudadelaComponent } from './componentes/ciudadela/ciudadela/ciudadela.component';
import { CiudadelaregistrarlibreComponent } from './componentes/ciudadela/ciudadelaregistrarlibre/ciudadelaregistrarlibre.component';
import { CiudadelavalidarComponent } from './componentes/ciudadela/ciudadelavalidar/ciudadelavalidar.component';
import { FutbolfamiliaComponent } from './componentes/futbolfamilia/futbolfamilia/futbolfamilia.component';
import { BaloncestoComponent } from './componentes/baloncesto/baloncesto/baloncesto.component';
import { TerminosciudComponent } from './componentes/ciudadela/terminosciud/terminosciud.component';
import { LoginadminComponent } from './componentes/usuarios/administrador/loginadmin/loginadmin.component';
import { InicioadminComponent } from './componentes/usuarios/administrador/inicioadmin/inicioadmin.component';
import { DatosadminComponent } from './componentes/usuarios/administrador/datosadmin/datosadmin.component';
import { LoginciudComponent } from './componentes/usuarios/validador/ciudadela/loginciud/loginciud.component';
import { IniciociudComponent } from './componentes/usuarios/validador/ciudadela/iniciociud/iniciociud.component';
import { IniciocarreraComponent } from './componentes/usuarios/validador/carrera/iniciocarrera/iniciocarrera.component';
import { LogincarreraComponent } from './componentes/usuarios/validador/carrera/logincarrera/logincarrera.component';


import { AdministradorGuard } from './servicios/guardas/administrador.guard';
import { CarreraGuard } from './servicios/guardas/carrera.guard';
import { CiudadelaGuard } from './servicios/guardas/ciudadela.guard';
import { TerminoscarreraComponent } from './componentes/carrera/terminoscarrera/terminoscarrera.component';





const routes: Routes = [

  //INICIO

  { path: '', component: InicioComponent, },
  { path: 'contacto', component: ContactoComponent, },



  //CIUDADELA
  { path: 'ciudadela', component: CiudadelaComponent, },
  { path: 'ciudadela/validacion', component:  CiudadelavalidarComponent},
  { path: 'ciudadela/inscribirextrasval', component: CiudadelaregistrarlibreComponent, },
  { path: 'terminos', component: TerminosciudComponent, },
  { path: 'ciudadela/login', component: LoginciudComponent, },
  { path: 'ciudadela/login/inicio', component: IniciociudComponent,  canActivate:[CiudadelaGuard] },






  //CARRERA
  { path: 'carrera', component: CarreraComponent, },
  { path: 'carrera/validacion', component: CarreravalidarComponent, },
  { path: 'carrera/inscribirdiciembre', component: CarreraregistrarcodigoComponent, },
  { path: 'carrera/terminos', component: TerminoscarreraComponent, },
  { path: 'carrera/inscribir', component: CarreraregistrarlibreComponent, },
  { path: 'carrera/login', component: LogincarreraComponent, },
  { path: 'carrera/login/inicio', component: IniciocarreraComponent, canActivate:[CarreraGuard] },


  //FUTBOLFAMILIA

  { path: 'futbolfamilia', component: FutbolfamiliaComponent, },

  //BALONCESTO

  { path: 'baloncestofamilia', component: BaloncestoComponent, },






  //ADMINISTRADORES
  { path: 'administrador/login', component: LoginadminComponent, },
  { path: 'administrador/login/inicio', component: InicioadminComponent, canActivate:[AdministradorGuard] },
  { path: 'administrador/login/validar', component: DatosadminComponent, canActivate:[AdministradorGuard]},



  //VALIDADORES





  

  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
