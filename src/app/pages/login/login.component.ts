import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credenciais: Credenciais = { email: 'adm@teste.com.br', senha: '123' };
  loginForm: FormGroup;

  esqueciSenha: boolean;
  esqueciSenhaForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
  }

  login() {
  }

}
