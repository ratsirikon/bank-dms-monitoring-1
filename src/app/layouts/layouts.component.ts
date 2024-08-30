import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent {
  isSidebarOpen = false;

  constructor(private router: Router) { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goToHome() {
    const urlPath = `/home`
    window.location.href = urlPath
  }

  goToAddHospital() {
    const urlPath = `/form/add-hospital`
    window.location.href = urlPath
    return `form/add-hospital`
  }

  goToAddMachine() {
    const urlPath = `/form/add-machine`
    window.location.href = urlPath
  }

  goToAddSensor() {
    const urlPath = `/form/add-sensor`
    window.location.href = urlPath
  }

  goToPage(path: string) {
    const urlPath = path
    this.router.navigate([`${path}`]).then(() => {
      window.location.reload()
    })
  }


}
