import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais.model';
import { AuthService } from 'src/app/services/auth.service';
import { blankStringValidator } from 'src/app/shared/validators/blank-string.validator';

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
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [this.credenciais.email, [Validators.required, Validators.maxLength(30), blankStringValidator]],
      senha: [this.credenciais.senha, [Validators.required, Validators.maxLength(10), blankStringValidator]]
    });   
    
    if (this.authService.canRefreshToken()) {
      this.authService.refreshToken().subscribe(response => {
        this.authService.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['home']);
      },
        error => { });
    }    
  }

  login() {

    this.credenciais = { email: this.loginControl.email.value, senha: this.loginControl.senha.value };

    this.authService.authenticate(this.credenciais).subscribe(response => {
      this.authService.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['home']);
    }, error => {
      //this.openSnackBar('Não foi possível logar', 'Alerta');
    });    
  }

  get loginControl() {
    return this.loginForm.controls;
  }  

}
