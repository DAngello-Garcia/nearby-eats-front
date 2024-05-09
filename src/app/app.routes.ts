import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EmailRecuperacionComponent } from './components/email-recuperacion/email-recuperacion.component';
import { CambiarContraseniaComponent } from './components/cambiar-contrasenia/cambiar-contrasenia.component';
import { ActualizarCuentaComponent } from './components/actualizar-cuenta/actualizar-cuenta.component';
import { CrearLugarComponent } from './components/crear-lugar/crear-lugar.component';
import { GestionNegociosComponent } from './components/gestion-negocios/gestion-negocios.component';
import { DetalleNegocioComponent } from './components/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'email-recuperacion', component: EmailRecuperacionComponent},
    { path: 'cambiar-contrasenia', component: CambiarContraseniaComponent},
    { path: 'actualizar-cuenta', component: ActualizarCuentaComponent},
    { path: 'crear-lugar', component: CrearLugarComponent},
    { path: "gestion-negocios", component: GestionNegociosComponent},
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent},
    { path: "busqueda/:texto", component: BusquedaComponent},
    { path: "**", pathMatch: "full", redirectTo: "" }
];