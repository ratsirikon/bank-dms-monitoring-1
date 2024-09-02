import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.scss']
})
export class EditMachineComponent {

  goToHome() {
    const pathUrl = `/home`
    window.location.href = pathUrl
  }

  getHospitalImg() {
    return `./assets/img/machine/image-placeholder.png`
  }
  
}
