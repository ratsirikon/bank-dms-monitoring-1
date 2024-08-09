import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartAndSensor } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-part-sorting',
  templateUrl: './part-sorting.component.html',
  styleUrls: ['./part-sorting.component.scss']
})

export class PartSortingComponent {

  // ----- intervalId เอาไว้เก็บการทำงานของ setInterval() --------------
  private intervalId: any

  // ----- urlParam ('/:hos/:mach/:part') ------------
  paramHos: string = ''
  paramMach: string = ''
  paramPart: string = ''

  partSensorList: PartAndSensor[] = []
  // partList: Part[] = []

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') ?? '';
    this.paramMach = this.route.snapshot.paramMap.get('mach') ?? '';
    this.paramPart = this.route.snapshot.paramMap.get('part') ?? '';
    console.log('this.paramData = ' + this.paramHos, this.paramMach, this.paramPart)

    this.getPartAndSensor()
  }

  ngOnDestroy(): void { }

  getPartAndSensor() {
    let partAndSensor: PartAndSensor[] = []
    this.httpClient.get<PartAndSensor[]>(`http://localhost:3000/api/part_and_sensor?part_id=${this.paramPart}`).subscribe(
      response => {
        partAndSensor = response
        this.partSensorList = partAndSensor
        console.log(`part and sensor | part-sorting = `, this.partSensorList)
      }
    )
  }

  // -------- ดึงรูปภาพมาแสดง -------------------
  getPartImg() {
    if (this.partSensorList[0].part_category == 5) {
      return `./assets/img/machine/srt1-start.png`
    }
    else if (this.partSensorList[0].part_category == 4) {
      return `./assets/img/machine/srt1-basket.png`
    }
    else if (this.partSensorList[0].part_category == 3) {
      return `./assets/img/machine/srt1-reject.png`
    }
    else {
      return './assets/img/machine/image-placeholder.png'
    }
  }


  // -------- กำหนดตำแหน่งของ sensor ------------------------------
  sensorPosition(sensor_position: Number) {
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
    else {
      return "sensor-null"
    }
  }

  // -------- กำหนดตำแหน่ง เส้น ของ sensor ------------------------------
  sensorLine(sensor_position: Number) {
    if (sensor_position == 1) {
      return "sensor-line-1"
    }
    else if (sensor_position == 2) {
      return "sensor-line-2"
    }
    else if (sensor_position == 3) {
      return "sensor-line-3"
    }
    else if (sensor_position == 4) {
      return "sensor-line-4"
    }
    else if (sensor_position == 5) {
      return "sensor-line-5"
    }
    else if (sensor_position == 6) {
      return "sensor-line-6"
    }
    else if (sensor_position == 7) {
      return "sensor-line-7"
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
  // -------- if 0 = สีแดง --------------------
  // -------- if 1 = สีเขียว --------------------
  sensorStatus(sensor_status: Number) {
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
}
