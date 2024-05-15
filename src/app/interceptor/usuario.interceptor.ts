import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';

export const usuarioInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const isApiUrl = req.url.includes("api/auth");
    const isAPiPublico = req.url.includes("api/public");

    if (!tokenService.isLogged() || isApiUrl || isAPiPublico) {
        return next(req);
    }

    const token = tokenService.getToken();
    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authReq);
};