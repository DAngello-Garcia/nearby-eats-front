import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EmailRecuperacionComponent } from './components/email-recuperacion/email-recuperacion.component';
import { CambiarContraseniaComponent } from './components/cambiar-contrasenia/cambiar-contrasenia.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'email-recuperacion', component: EmailRecuperacionComponent},
    { path: 'cambiar-contrasenia', component: CambiarContraseniaComponent},
    { path: "**", pathMatch: "full", redirectTo: "" }
];