import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent {

  constructor(private router: Router) { }

  goToHome() {
    const pathUrl = `/home`
    window.location.href = pathUrl
  }

  getHospitalImg() {
    return `./assets/img/machine/image-placeholder.png`
  }

}
