import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: String;

  appPages = [
    {
      title: 'Projetos',
      url: 'projetos',
      icon: 'view_in_ar',
      authority: 'LISTAR_PROJETO'
    }
  ]

  constructor(
    public router: Router, 
    private authService: AuthService
    ) {}

  ngOnInit() {    
    this.username = this.authService.getEmail();
  }

  openPage(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
