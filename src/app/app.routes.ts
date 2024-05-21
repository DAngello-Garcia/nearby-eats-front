import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/client/registro/registro.component';
import { EmailRecuperacionComponent } from './components/client/email-recuperacion/email-recuperacion.component';
import { CambiarContraseniaComponent } from './components/client/cambiar-contrasenia/cambiar-contrasenia.component';
import { ActualizarCuentaComponent } from './components/client/actualizar-cuenta/actualizar-cuenta.component';
import { CrearLugarComponent } from './components/client/crear-lugar/crear-lugar.component';
import { GestionNegociosComponent } from './components/client/gestion-negocios/gestion-negocios.component';
import { DetalleNegocioComponent } from './components/client/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { DetalleClienteComponent } from './components/client/detalle-cliente/detalle-cliente.component';
import { MensajeConfirmacionEmailComponent } from './components/client/mensaje-confirmacion-email/mensaje-confirmacion-email.component';
import { MensajeConfirmacionContraseniaComponent } from './components/client/mensaje-confirmacion-contrasenia/mensaje-confirmacion-contrasenia.component';
import { RevisionComponent } from './components/revision/revision.component';
import { ListaRevisionComponent } from './components/lista-revision/lista-revision.component';
import { LugaresFavoritosComponent } from './components/client/lugares-favoritos/lugares-favoritos.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'email-recuperacion', component: EmailRecuperacionComponent },
    { path: 'cambiar-contrasenia/:tokenemail', component: CambiarContraseniaComponent },
    {
        path: 'actualizar-cuenta', component: ActualizarCuentaComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENT"]
        }
    },
    {
        path: 'crear-lugar', component: CrearLugarComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENT"]
        }
    },
    {
        path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard],
        data: { expectedRole: ["CLIENT"] }
    },
    { path: "detalle-negocio/:id", component: DetalleNegocioComponent },
    { path: "busqueda/:texto", component: BusquedaComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    {
        path: 'lista-revision', component: ListaRevisionComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["MODERATOR"]
        }
    },
    {
        path: 'revision/:id', component: RevisionComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["MODERATOR"]
        }
    },
    { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
    { path: 'get-user/:id', component: DetalleClienteComponent },
    { path: 'mensaje-email-recuperacion', component: MensajeConfirmacionEmailComponent },
    { path: 'mensaje-contrasenia-exitosa', component: MensajeConfirmacionContraseniaComponent }, 
    {
        path: 'ver-lugares-favoritos', component: LugaresFavoritosComponent, canActivate: [RolesGuard], data: {
            expectedRole: ["CLIENT"]
        }
    },
    { path: "**", pathMatch: "full", redirectTo: "" }
];