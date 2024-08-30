import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hospital } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {

  private hospitalSubscription: Subscription | undefined

  hospitalList: Hospital[] = []
  paramHos: string = ''

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getHospitalData()
  }

  ngOnDestroy(): void {
  }


  getHospitalImg(hospital_img: number) {
    if (hospital_img == 1) {
      return `dd`
    }
    else {
      return '/assets/img/machine/image-placeholder.png'
    }
  }

  getHospitalData() {
    this.hospitalSubscription = this.httpClient.get<Hospital[]>('http://localhost:3000/api/hospital').subscribe(
      {
        next: (response) => {
          this.hospitalList = response
          console.log('getHospitalData (Response) : ', response)
        },
        error: (error) => {
          console.error('Error on getHospitalData() : ', error)
        }
      }
    )
  }

  goToAddHospital() {
    const url = `/form/add-hospital`
    window.location.href = url
  }

  selectHospital(hospital: string) {
    if (hospital) {
      this.router.navigate([`/monitoring/${hospital}`])
    } else {
      console.log('Error choose hospital first')
    }
  }

}
