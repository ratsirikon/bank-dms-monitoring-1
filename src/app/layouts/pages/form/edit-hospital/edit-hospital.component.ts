import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent {

  constructor() { }

  goToHome() {
    const pathUrl = `/home`
    window.location.href = pathUrl
  }
  
  getHospitalImg() {
    return `./assets/img/machine/image-placeholder.png`
  }
}
