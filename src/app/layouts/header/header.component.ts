import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor() { }

  goToHome() {
    const urlToHome = `/home`
    window.location.href = urlToHome
  }

}
