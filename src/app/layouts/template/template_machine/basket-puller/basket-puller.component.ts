import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineAndPart } from 'src/app/shared/interfaces/monitoring';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basket-puller',
  templateUrl: './basket-puller.component.html',
  styleUrls: ['./basket-puller.component.scss']
})
export class BasketPullerComponent {

  // ----- intervalId เอาไว้เก็บการทำงานของ setInterval() --------------
  private intervalId: any

  // ----- urlParam ('/:hos/:mach') ------------
  paramHos: string = ''
  paramMach: string = ''

  // ------- เก็บข้อมูลของ machine, part, sensor ไว้ในตัวเดียว ----------
  machineAndPart: MachineAndPart[] = [] 

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') || ''
    this.paramMach = this.route.snapshot.paramMap.get('mach') || ''
    console.log('paramHos = ' + this.paramHos)
    console.log('paramMach = ' + this.paramMach)
    this.startInterval()
  }

  ngOnDestroy(): void {
    this.clearInterval()
  }

  // --------- เริ่มการทำงานของ interval() ----------------------------
  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.getMachineAndPart()
    }, 1000)
  }

  // --------- หยุดการทำงานของ interval() ----------------------------
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

  getPartImg(part_id: Number) {
    if (part_id == 1) {
      return `assets/img/machine/machine-part-2-2-remove-num.png`
    }
    else if (part_id == 2) {
      return `assets/img/machine/machine-part-2-5-1-remove-num.png`
    }
    else {
      return `assets/img/machine/image-placeholder.png`
    }
  }

  // -------- กำหนดตำแหน่งของ sensor ------------------------------
  sensorPosition(sensor_position: Number) {
    if (sensor_position == 1) {
      return 'sensor-1'
    }
    else if (sensor_position == 2) {
      return 'sensor-2'
    }
    else if (sensor_position == 3) {
      return 'sensor-3'
    }
    else if (sensor_position == 4) {
      return 'sensor-4'
    }
    else if (sensor_position == 5) {
      return 'sensor-5'
    }
    else if (sensor_position == 6) {
      return 'sensor-6'
    }
    else if (sensor_position == 7) {
      return 'sensor-7'
    }
    else if (sensor_position == 8) {
      return 'sensor-8'
    }
    else if (sensor_position == 9) {
      return 'sensor-9'
    }
    else if (sensor_position == 10) {
      return 'sensor-10'
    }
    else if (sensor_position == 11) {
      return 'sensor-11'
    }
    else if (sensor_position == 12) {
      return 'sensor-12'
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
  goToPart(part_id: Number) {
    const urlPart = `/monitoring/${this.paramHos}/${this.paramMach}/${part_id}`
    this.router.navigateByUrl(urlPart)
  }


}
