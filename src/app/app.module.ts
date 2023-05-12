import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { InicioComponent } from './componentes/principales/inicio/inicio.component';
import { FooterpComponent } from './componentes/principales/footerp/footerp.component';
import { NavbarpComponent } from './componentes/principales/navbarp/navbarp.component';
import { CarreraComponent } from './componentes/carrera/carrera/carrera.component';
import { CarreravalidarComponent } from './componentes/carrera/carreravalidar/carreravalidar.component';
import { CarreraregistrarcodigoComponent } from './componentes/carrera/carreraregistrarcodigo/carreraregistrarcodigo.component';
import { CarreraregistrarlibreComponent } from './componentes/carrera/carreraregistrarlibre/carreraregistrarlibre.component';
import { PatrocinadoresComponent } from './componentes/carrera/patrocinadores/patrocinadores.component';
import { CiudadelaComponent } from './componentes/ciudadela/ciudadela/ciudadela.component';
import { CiudadelaregistrarlibreComponent } from './componentes/ciudadela/ciudadelaregistrarlibre/ciudadelaregistrarlibre.component';
import { CiudadelavalidarComponent } from './componentes/ciudadela/ciudadelavalidar/ciudadelavalidar.component';
import { PatrocinadoresciudComponent } from './componentes/ciudadela/patrocinadoresciud/patrocinadoresciud.component';
import { FutbolfamiliaComponent } from './componentes/futbolfamilia/futbolfamilia/futbolfamilia.component';
import { TerminosciudComponent } from './componentes/ciudadela/terminosciud/terminosciud.component';
import { LoginadminComponent } from './componentes/usuarios/administrador/loginadmin/loginadmin.component';
import { InicioadminComponent } from './componentes/usuarios/administrador/inicioadmin/inicioadmin.component';
import { DatosadminComponent } from './componentes/usuarios/administrador/datosadmin/datosadmin.component';
import { LoginciudComponent } from './componentes/usuarios/validador/ciudadela/loginciud/loginciud.component';
import { IniciociudComponent } from './componentes/usuarios/validador/ciudadela/iniciociud/iniciociud.component';
import { ValidarciudComponent } from './componentes/usuarios/validador/ciudadela/validarciud/validarciud.component';
import { NavbarciudComponent } from './componentes/usuarios/principales/navbarciud/navbarciud.component';
import { IniciocarreraComponent } from './componentes/usuarios/validador/carrera/iniciocarrera/iniciocarrera.component';
import { LogincarreraComponent } from './componentes/usuarios/validador/carrera/logincarrera/logincarrera.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterpComponent,
    NavbarpComponent,
    CarreraComponent,
    CarreravalidarComponent,
    CarreraregistrarcodigoComponent,
    CarreraregistrarlibreComponent,
    PatrocinadoresComponent,
    CiudadelaComponent,
    CiudadelaregistrarlibreComponent,
    CiudadelavalidarComponent,
    PatrocinadoresciudComponent,
    FutbolfamiliaComponent,
    TerminosciudComponent,
    LoginadminComponent,
    InicioadminComponent,
    DatosadminComponent,
    LoginciudComponent,
    IniciociudComponent,
    ValidarciudComponent,
    NavbarciudComponent,
    IniciocarreraComponent,
    LogincarreraComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    DataTablesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
