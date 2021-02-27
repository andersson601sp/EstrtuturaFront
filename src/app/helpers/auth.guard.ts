import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const user = this.authenticationService.userValue;
        if (user) {
            // verifique se a rota é restrita por função usuario
            if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
                // função não autorizada, então redirecionar para a página inicial
                this.router.navigate(['/']);
                return false;
            }

            // autorizado então retorne verdadeiro
            return true;
        }

        // não está logado, então redirecione para a página de login com o url de retorno
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
