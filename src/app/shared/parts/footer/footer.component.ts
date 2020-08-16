import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['/painel']);
  }
}
