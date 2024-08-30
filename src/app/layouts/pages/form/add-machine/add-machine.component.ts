import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent {

  constructor(private router: Router) { }

  goToHome() {
    const pathUrl = `/home`
    window.location.href = pathUrl
  }

  getHospitalImg() {
    return `./assets/img/machine/image-placeholder.png`
  }

}
