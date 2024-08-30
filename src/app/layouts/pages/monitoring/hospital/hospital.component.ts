import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hospital, Machine } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit, OnDestroy {

  private intervalId: any
  paramHos: string = ''

  // ------------------------------------
  hospitalData: Hospital[] = []

  hospitalList: Hospital[] = []
  machineList: Machine[] = []

  machListByHos: Machine[] = []

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') ?? "";
    // console.log('paramHos = ' + this.paramHos);
    this.getMachineByHos()
    this.checkHospitalData();
  }

  ngOnDestroy(): void {
  }


  // --------- กลับไปหน้า '/home' -----------------------
  goToHome() {
    this.router.navigateByUrl('/home')
  }

  goToAddMachine() {
    const urlPath = `/form/add-machine`
    window.location.href = urlPath
  }


  // --------- เช็ค parameter ใน url ว่าชื่อย่อโรงพยาบาล hospital_short มีอยู่ใน database หรือไม่  -------------
  // --------- if True ให้ทำงานต่อไป -------------------------------------------------------------------
  // --------- if False ให้กลับไปที่หน้า '/home' เพื่อเลือกโรงพยาบาลอีกครั้ง ------------------------------
  checkHospitalData() {
    let _hospitalList: Hospital[] = []
    // let _hospital: Hospital[] = []

    this.httpClient.get<Hospital[]>('http://localhost:3000/api/hospital')
      .subscribe(response => {
        _hospitalList = response
        console.log('getHospitalData() = ', _hospitalList)
        let _hospital = _hospitalList.find(hos => (hos.hospital_short == this.paramHos))

        if (_hospital) {
          this.hospitalData = [_hospital]
          console.log('_hospitalList.find() = ', _hospital.hospital_name)
        }
        else {
          // console.log('_hospitalList.find() = "Not Found" ')
          this.goToHome()
        }
      });
  }

  // -------ดึงข้อมูลเครื่องจักรที่มีในโรงพยาบาลนี้------------------------------
  getMachineByHos() {
    this.httpClient.get<any[]>(`http://localhost:3000/api/machine_by_hos?hos_short=${this.paramHos}`).subscribe(response => {
      this.machListByHos = response
      // console.log('machListByHos data = ', this.machListByHos)
    })
  }


  // --------- แสดงรูปภาพ แยกตามประเภทของเครื่องจักร -----------------------
  getMachineImg(machine_category: Number) {
    if (machine_category == 1) {
      return '/assets/img/machine/machine-io-basket.png'
    }
    else if (machine_category == 2) {
      return '/assets/img/machine/machine-io-sorting.png'
    }
    else {
      return '/assets/img/machine/image-placeholder.png'
    }
  }


  // ---------- เข้าไปที่หน้า machine -----------------------------
  goToMachine(machine_id: Number) {
    const urlMachine = `/monitoring/${this.paramHos}/${machine_id.toString()}`
    // window.location.href = urlMachine
    this.router.navigateByUrl(urlMachine);
  }

}
