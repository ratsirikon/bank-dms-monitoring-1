import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital, MachineAndHospital, PartAndMachine, PartAndSensor, PartMachHos } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})

export class PartComponent {

  // ----- urlParam ('/:hos/:mach/:part') ------------
  paramHos: string = ''
  paramMach: string = ''
  paramPart: string = ''


  partByMach: any[] = []
  partMachHos: PartMachHos[] = []



  partSensorList: PartAndSensor[] = []

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') ?? '';
    this.paramMach = this.route.snapshot.paramMap.get('mach') ?? '';
    this.paramPart = this.route.snapshot.paramMap.get('part') ?? '';
    // console.log('this.paramData = ' + this.paramHos + `,` + this.paramMach + `,` + this.paramPart)

    // this.getPartByMachine()
    // this.checkUrlPart()

    this.getPartMachHos()
    this.getPartAndSensor()
    this.getPartImg()
  }

  ngOnDestroy(): void { }

  // --------- กลับไปหน้า '/home' -----------------------
  goToHome() {
    this.router.navigateByUrl('/home')
  }

  // -------- กลับไปหน้า hospital --------------
  goToHospital() {
    this.router.navigate([`/monitoring/${this.paramHos}`])
  }

  // -------- กลับไปหน้า 'monitoring/:hos/:mach' --------------
  goToMachine() {
    const urlMachine = `/monitoring/${this.paramHos}/${this.paramMach}`
    this.router.navigateByUrl(urlMachine)
  }

  checkUrlPart() {
    // --------- เช็ค parameter ใน url ว่า ชื่อย่อโรงพยาบาล hospital_short มีอยู่ใน database หรือไม่  -------------
    let _hospitalList: Hospital[] = []
    let hospital: Hospital | undefined

    this.httpClient.get<Hospital[]>('http://localhost:3000/api/hospital')
      .subscribe(response => {
        _hospitalList = response
        // console.log('getHospitalData() = ', _hospitalList)
        hospital = _hospitalList.find(hos => (hos.hospital_short == this.paramHos))

        if (hospital) {
          // console.log('_hospitalList.find(hospital_name) = ', hospital.hospital_name)
        }
        else {
          // console.log('_hospitalList.find(hospital_name) = "Not Found" ')
          this.goToHome()
        }
      });

    // --------- เช็ค parameter ใน url ว่า ไอดีของเครื่องจักร machine_id มีอยู่ใน database หรือไม่  -------------
    let _machineList: MachineAndHospital[] = []
    let machine: MachineAndHospital | undefined

    this.httpClient.get<MachineAndHospital[]>(`http://localhost:3000/api/machine_by_hos?hos_short=${this.paramHos}`).subscribe(
      response => {
        _machineList = response
        // console.log(`checkMachineData response = `, _machineList)
        machine = _machineList.find(machine => (machine.machine_id == parseInt(this.paramMach)))

        if (machine) {
          // console.log(`_machineList.find(machine_id) = `, machine.machine_id)
        }
        else {
          // console.log('_machineList.find(machine_id) = "Not Found" ')
          this.goToHospital()
        }
      })

    // --------- เช็ค parameter ใน url ว่า part_id มีอยู่ใน database หรือไม่  -------------
    let _partList: PartAndMachine[] = []
    let part: PartAndMachine | undefined

    this.httpClient.get<PartAndMachine[]>(`http://localhost:3000/api/part_by_mach?machine_id=${this.paramMach}`)
      .subscribe(response => {
        _partList = response

        part = _partList.find(part => (part.part_id == parseInt(this.paramPart)))

        if (part) {
          console.log('_hospitalList.find(part_machine) = ', part.part_name)
        }
        else {
          console.log('_hospitalList.find(part_machine) = "Not Found" ')
          this.goToMachine()
        }
      });
  }

  getPartByMachine() {
    this.httpClient.get<any[]>(`http://localhost:3000/api/part_by_mach?machine_id=${this.paramMach}`).subscribe(
      response => {
        this.partByMach = response
        console.log(`getPartByMachine() response = `, response);
      }
    )
  }

  getPartMachHos() {
    this.httpClient.get<PartMachHos[]>(`http://localhost:3000/api/part_by_mach?hospital_short=${this.paramHos}&machine_id=${this.paramMach}&part_id=${this.paramPart}`).subscribe(
      response => {
        this.partMachHos = response
        console.log(`getPartMachHos() response = `, response)
      }
    )
  }

  goToAddSensor() {
    const urlPath = `/form/add-sensor`
    window.location.href = urlPath
  }





  // ------ โค้ดที่ดึงมาจาก part-puller.ts -------------

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
    if (this.partMachHos[0].part_category == 1) {
      return './assets/img/machine/machine-part-2-2-remove-num.png'
    }
    else if (this.partMachHos[0].part_category == 2) {
      return './assets/img/machine/machine-part-2-5-1-remove-num.png'
    }
    else if (this.partSensorList[0].part_category == 3) {
      return `./assets/img/machine/srt1-reject.png`
    }
    else if (this.partSensorList[0].part_category == 4) {
      return `./assets/img/machine/srt1-basket.png`
    }
    else if (this.partSensorList[0].part_category == 5) {
      return `./assets/img/machine/srt1-start.png`
    }
    else {
      return './assets/img/machine/image-placeholder.png'
    }
  }

  // ------- ใส่สีพื้นหลังของ sensor บนรูปของ machine -----------------------------------
  // -------- if 0 = สีแดง --------------------
  // -------- if 1 = สีเขียว --------------------
  sensorBoxStatus(sensor_status: number) {
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
  sensorLineStatus(sensor_status: number) {
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
  sensorStatus(sensor_status: number) {
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


  // -------- ลองทำ ngStyle แบบ dynamic กับค่าที่ดึงมาจาก postgres ------------------
  sensorBoxPositionNew(sensor_box_position_left: number, sensor_box_position_top: number) {
    if (sensor_box_position_left == null || sensor_box_position_top == null) {
      return {
        'position': `absolute`,
        'left': '0',
        'top': '0'
      }
    }
    else {
      return {
        'position': `absolute`,
        'left': `${sensor_box_position_left.toString()}%`,
        'top': `${sensor_box_position_top.toString()}%`
      }
    }
  }

  sensorLinePositionNew(sensor_line_position_left: number, sensor_line_position_top: number, sensor_line_length: number, sensor_line_rotation: number) {
    if (sensor_line_position_left == null || sensor_line_position_top == null || sensor_line_length == null || sensor_line_rotation == null) {
      return {
        'position': `absolute`,
        'left': '0',
        'top': '0'
      }
    }
    else {
      return {
        'position': `absolute`,
        'left': `${sensor_line_position_left.toString()}%`,
        'top': `${sensor_line_position_top.toString()}%`,
        'width': `${sensor_line_length.toString()}%`,
        'rotate': `${sensor_line_rotation.toString()}deg`
      }
    }
  }




}
