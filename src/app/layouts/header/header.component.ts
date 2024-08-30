import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  isSidebarOpen = false
  
  constructor() { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
  }

  goToHome() {
    const urlToHome = `/home`
    window.location.href = urlToHome
  }

  goToAddHos() {
    const urlToAddHos = `/form/add-hospital`
    window.location.href = urlToAddHos
  }

}
