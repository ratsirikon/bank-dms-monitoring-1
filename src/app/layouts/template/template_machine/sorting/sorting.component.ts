import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MachineAndPart, Part, Sensor } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})

export class SortingComponent {

  // ----- intervalId เอาไว้เก็บการทำงานของ setInterval() --------------
  private intervalId: any

  // ----- urlParam ('/:hos/:mach') ------------
  paramHos: string = ''
  paramMach: string = ''

  // --------------------------------------------
  machineAndPart: MachineAndPart[] = []

  sensorDataList: Sensor[] = []


  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') || ''
    this.paramMach = this.route.snapshot.paramMap.get('mach') || ''
    // console.log('paramHos = ' + this.paramHos)
    // console.log('paramMach = ' + this.paramMach)

    this.startInterval()
  }

  ngOnDestroy(): void {
    this.clearInterval()
  }

  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.getMachineAndPart()
    }, 1000)
  }

  clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  // -------- กลับไปหน้า hospital --------------
  goToHospital() {
    this.router.navigate([`/monitoring/${this.paramHos}`])
  }

  // --------- ดึงรูปภาพจาก /assets/img/machine --------------
  getMachineImg(part_img: Number) {
    if (part_img == 3) {
      return '/assets/img/machine/srt1-reject.png'
    }
    else if (part_img == 4) {
      return '/assets/img/machine/srt1-basket.png'
    }
    else if (part_img == 5) {
      return '/assets/img/machine/srt1-start.png'
    }
    else {
      return '/assets/img/machine/image-placeholder.png'
    }
  }

  // ---------- ดึงข้อมูลมาจาก database -----------------
  getMachineAndPart() {
    let _machineAndPart: MachineAndPart[] = []
    this.httpClient.get<MachineAndPart[]>(`http://localhost:3000/api/machine_and_part?machine_id=${this.paramMach}`).subscribe(
      response => {
        _machineAndPart = response
        console.log('_machineAndPart = ', _machineAndPart)
        this.machineAndPart = _machineAndPart
      }
    )
  }

  // -------- กำหนดตำแหน่งของ sensor ------------------------------
  sensorPosition(sensor_position: Number) {
    if (sensor_position) {
      return `sensor-${sensor_position}`
    }
    else {
      return "sensor-position-null"
    }
  }

  // -------- กำหนดตำแหน่ง เส้น ของ sensor ------------------------------
  sensorLine(sensor_line: Number) {
    if (sensor_line) {
      return `sensor-line-${sensor_line}`
    }
    else {
      return "sensor-line-null"
    }
  }

  // ------- ใส่สีพื้นหลังของ sensor  -----------------------------------
  // -------- if 0 = สีแดง --------------------
  // -------- if 1 = สีเขียว --------------------
  sensorBoxStatus(sensor_status: Number) {
    if (sensor_status == 0) {
      return "status-0"
    }
    else if (sensor_status == 1) {
      return "status-1"
    }
    else {
      return "status-null"
    }
  }

  // -------- ไปหน้า '/monitoring/:hos/:mach/:part' -----------------
  goToPart(part_id: any) {
    const urlPart = `/monitoring/${this.paramHos}/${this.paramMach}/${part_id}`
    this.router.navigateByUrl(urlPart)
  }


}
