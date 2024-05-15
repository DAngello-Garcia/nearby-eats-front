import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { usuarioInterceptor } from './interceptor/usuario.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient()]
  // providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([usuarioInterceptor]))]
};
