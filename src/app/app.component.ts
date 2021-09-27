import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Appointment System';

  appPages = [
    {
      title: 'Projetos',
      url: 'projetos',
      icon: 'view_in_ar'
    }
  ]

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  openPage(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
