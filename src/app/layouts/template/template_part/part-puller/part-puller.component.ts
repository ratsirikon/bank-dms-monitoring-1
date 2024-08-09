import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Part, PartAndSensor } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-part-puller',
  templateUrl: './part-puller.component.html',
  styleUrls: ['./part-puller.component.scss']
})
export class PartPullerComponent {

  // ----- intervalId เอาไว้เก็บการทำงานของ setInterval() --------------
  private intervalId: any

  // ----- urlParam ('/:hos/:mach/:part') ------------
  paramHos: string = ''
  paramMach: string = ''
  paramPart: string = ''

  partSensorList: PartAndSensor[] = []
  partList: Part[] = []


  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') ?? '';
    this.paramMach = this.route.snapshot.paramMap.get('mach') ?? '';
    this.paramPart = this.route.snapshot.paramMap.get('part') ?? '';
    // console.log('this.paramData = ' + this.paramHos, this.paramMach, this.paramPart)

    // this.startInterval()
    this.getPartAndSensor()

  }

  ngOnDestroy(): void {
    this.clearInterval()
  }

  // --------- เริ่มการทำงานของ interval() ----------------------------
  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.getPartAndSensor()
      this.getPartImg()
    }, 2000)
  }

  // --------- หยุดการทำงานของ interval() ----------------------------
  clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  // --------- ดึงข้อมูล part กับ sensor -------------------------
  getPartAndSensor() {
    let partAndSensor: PartAndSensor[] = []
    this.httpClient.get<PartAndSensor[]>(`http://localhost:3000/api/part_and_sensor?part_id=${this.paramPart}`).subscribe(
      response => {
        partAndSensor = response
        this.partSensorList = partAndSensor
        console.log(`part and sensor = `, this.partSensorList)
      }
    )
  }

  // -------- ดึงรูปภาพมาแสดง -------------------
  getPartImg() {
    if (this.partSensorList[0].part_category == 1) {
      return './assets/img/machine/machine-part-2-2-remove-num.png'
    }
    else if (this.partSensorList[0].part_category == 2) {
      return './assets/img/machine/machine-part-2-5-1-remove-num.png'
    }
    else {
      return './assets/img/machine/image-placeholder.png'
    }
  }

  // -------- กำหนดตำแหน่งของ sensor ------------------------------
  sensorBoxPosition(sensor_position: Number) {
    if (sensor_position == 1) {
      return "sensor-1"
    }
    else if (sensor_position == 2) {
      return "sensor-2"
    }
    else if (sensor_position == 3) {
      return "sensor-3"
    }
    else if (sensor_position == 4) {
      return "sensor-4"
    }
    else if (sensor_position == 5) {
      return "sensor-5"
    }
    else if (sensor_position == 6) {
      return "sensor-6"
    }
    else if (sensor_position == 7) {
      return "sensor-7"
    }
    else if (sensor_position == 8) {
      return "sensor-8"
    }
    else if (sensor_position == 9) {
      return "sensor-9"
    }
    else if (sensor_position == 10) {
      return "sensor-10"
    }
    else if (sensor_position == 11) {
      return "sensor-11"
    }
    else if (sensor_position == 12) {
      return "sensor-12"
    }
    else {
      return "sensor-null"
    }
  }

  // -------- กำหนดตำแหน่ง เส้น ของ sensor ------------------------------
  sensorLinePosition(sensor_line: Number) {
    if (sensor_line == 1) {
      return "sensor-line-1"
    }
    else if (sensor_line == 2) {
      return "sensor-line-2"
    }
    else if (sensor_line == 3) {
      return "sensor-line-3"
    }
    else if (sensor_line == 4) {
      return "sensor-line-4"
    }
    else if (sensor_line == 5) {
      return "sensor-line-5"
    }
    else if (sensor_line == 6) {
      return "sensor-line-6"
    }
    else if (sensor_line == 7) {
      return "sensor-line-7"
    }
    else if (sensor_line == 8) {
      return "sensor-line-8"
    }
    else if (sensor_line == 9) {
      return "sensor-line-9"
    }
    else if (sensor_line == 10) {
      return "sensor-line-10"
    }
    else if (sensor_line == 11) {
      return "sensor-line-11"
    }
    else if (sensor_line == 12) {
      return "sensor-line-12"
    }
    else {
      return "sensor-line-null"
    }
  }

  // ------- ใส่สีพื้นหลังของ sensor บนรูปของ machine -----------------------------------
  // -------- if 0 = สีแดง --------------------
  // -------- if 1 = สีเขียว --------------------
  sensorBoxStatus(sensor_status: Number) {
    if (sensor_status == 0) {
      return "box-status-0"
    }
    else if (sensor_status == 1) {
      return "box-status-1"
    }
    else {
      return ""
    }
  }

  // ------- ใส่สีพื้นหลังไอคอนของ sensor ในตาราง -----------------------------------
  sensorLineStatus(sensor_status: Number) {
    if (sensor_status == 0) {
      return "line-status-0"
    }
    else if (sensor_status == 1) {
      return "line-status-1"
    }
    else {
      return "status-null"
    }
  }

  // ------- ใส่สีพื้นหลังไอคอนของ sensor ในตาราง -----------------------------------
  // -------- if 0 = สีแดง --------------------
  // -------- if 1 = สีเขียว --------------------
  sensorStatus(sensor_status: Number) {
    if (sensor_status == 0) {
      return "icon-status-0"
    }
    else if (sensor_status == 1) {
      return "icon-status-1"
    }
    else {
      return "status-null"
    }
  }
}




// getSensorData() {
//   let _partSensorList

//   let counter = 0; // Initialize a counter
//   const limit = 10; // Set the limit for the number of executions

//   const getAllMachineData = setInterval(() => {
//     counter++;

//     this.httpClient.get<Sensor[]>(`http://localhost:3000/api/sensor`).subscribe(
//       response => {
//         // console.log("response =", response)
//         _partSensorList = response.filter((param) => (param.sensor_part == parseInt(this.paramPart)));
//         this.partSensorList = _partSensorList
//         this.sensorTable = new MatTableDataSource(_partSensorList)
//         console.log("sensor list = ", this.partSensorList)
//       }
//     )

//     if (counter >= limit) {
//       clearInterval(getAllMachineData)
//       console.log('Interval cleared after 10 executions')
//     }
//   }, 1000)
// }