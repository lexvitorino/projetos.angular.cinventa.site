import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() headerCss: string;
  @Input() topHeaderCss: string;
  @Input() headerTitle: string;

  constructor(
  ) { }

  ngOnInit() {
  }
}
