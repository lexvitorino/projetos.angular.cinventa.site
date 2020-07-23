import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  baseUrl: string;

  constructor(
  ) { }

  ngOnInit() {
    this.baseUrl = environment.base_url;
  }
}
