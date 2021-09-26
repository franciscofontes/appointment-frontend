import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthorityGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const authority = route.data.authority;
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        if (!this.auth.hasAuthority(authority)) {
            this.router.navigate(['acesso-negado']);
            return false;
        }
        return true;
    }

    hasAuthority(authority: string) {
        if (!this.auth.isAuthenticated()) {
            return false;
        }
        return this.auth.hasAuthority(authority);
    }
}