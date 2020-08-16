import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  baseUrl: string;

  constructor(
    private login: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  navigate(rota: string) {
    this.router.navigate([rota]);
  }

  logout() {
    this.login.logout();
  }
}
