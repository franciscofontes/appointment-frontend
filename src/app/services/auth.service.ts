import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Credenciais } from '../models/credenciais.model';
import { LocalUser } from '../models/local-user.model';

@Injectable()
export class AuthService {

  baseUrl = environment.baseUrl;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public storage: StorageService) { }

  authenticate(credenciais: Credenciais) {
    return this.http.post(
      `${this.baseUrl}/login`,
      credenciais,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  refreshToken() {
    return this.http.post(
      `${this.baseUrl}/auth/refresh_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  gerarNovaSenha(email: string) {
    let emailDTO = { email: email };
    return this.http.post(
      `${this.baseUrl}/auth/forgot`,
      emailDTO,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string) {
    let token = authorizationValue.substring(7);
    let user: LocalUser = {
      token: token
    };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }

  public isAuthenticated(): boolean {
    if (this.storage.getLocalUser() != null) {
      return !this.jwtHelper.isTokenExpired(this.storage.getLocalUser().token);
    }
    return false;
  }

  canRefreshToken() {
    if (this.storage.getLocalUser() != null) {
      return this.jwtHelper.isTokenExpired(this.storage.getLocalUser().token);
    }
    return false;
  }

  getEmail() {
    if (this.storage.getLocalUser() != null) {
      let token = this.storage.getLocalUser().token;
      return this.jwtHelper.decodeToken(token).sub;
    }
    return "";
  }

  getNome() {
    if (this.storage.getLocalUser() != null) {
      let token = this.storage.getLocalUser().token;
      return this.jwtHelper.decodeToken(token).nome;
    }
    return "";
  }

  hasAuthority(authority: string) {
    let token = this.storage.getLocalUser().token;
    let authorities: string[] = this.jwtHelper.decodeToken(token).authorities;
    let has = false;
    authorities.forEach(a => {
      if (a === authority) {
        has = true;
      }
    });
    return has;
  }
}