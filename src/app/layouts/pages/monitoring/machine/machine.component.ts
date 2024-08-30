import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital, Machine, MachineAndHospital, MachineAndPart, PartMachHos } from 'src/app/shared/interfaces/monitoring';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent {

  // ----- intervalId เอาไว้เก็บการทำงานของ setInterval() --------------
  private intervalId: any

  // ----- urlParam ('/:hos/:mach') ------------
  paramHos: string = ''
  paramMach: string = ''
  paramPart: string = ''

  hospitalList: Hospital[] = [] // เก็บข้อมูลโรงพยาบาล

  machineList: Machine[] = [] // ข้อมูลเครื่องจักรทั้งหมด
  machListByHos: MachineAndHospital[] = [] //ข้อมูลเครื่องจักรที่อยู่ในโรงพยาบาลนี้

  machineData: Machine[] = []

  partMachHos: PartMachHos[] = []



  // ------- เก็บข้อมูลของ machine, part, sensor ไว้ในตัวเดียว ----------
  machineAndPart: MachineAndPart[] = []

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramHos = this.route.snapshot.paramMap.get('hos') ?? ''
    this.paramMach = this.route.snapshot.paramMap.get('mach') ?? ''
    // console.log('this.paramData = ' + this.paramHos, this.paramMach)
    this.getMachineByHos()
    this.checkUrlMachine()

    this.getMachineAndPart()


    // this.startInterval()
  }

  ngOnDestroy(): void { }

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

  // --------- กลับไปหน้า '/home' -----------------------
  goToHome() {
    this.router.navigateByUrl('/home')
  }

  // -------- กลับไปหน้า hospital --------------
  goToHospital() {
    this.router.navigate([`/monitoring/${this.paramHos}`])
  }

  goToAddPart() {
    const urlPath = `/form/add-part`
    window.location.href = urlPath
  }

  checkUrlMachine() {
    // --------- เช็ค parameter ใน url ว่า ชื่อย่อโรงพยาบาล hospital_short มีอยู่ใน database หรือไม่  -------------
    let _hospitalList: Hospital[] = []
    // let hospital: Hospital | undefined

    this.httpClient.get<Hospital[]>('http://localhost:3000/api/hospital')
      .subscribe(response => {
        _hospitalList = response
        // console.log('getHospitalData() = ', _hospitalList)
        let _hospital = _hospitalList.find(hos => (hos.hospital_short == this.paramHos))

        if (_hospital) {
          // console.log('_hospitalList.find(hospital_name) = ', hospital.hospital_name)
        }
        else {
          // console.log('_hospitalList.find(hospital_name) = "Not Found" ')
          this.goToHome()
        }
      });

    // --------- เช็ค parameter ใน url ว่า ไอดีของเครื่องจักร machine_id มีอยู่ใน database หรือไม่  -------------
    let _machineList: MachineAndHospital[] = []
    // let machine: MachineAndHospital | undefined

    this.httpClient.get<MachineAndHospital[]>(`http://localhost:3000/api/machine_by_hos?hos_short=${this.paramHos}`).subscribe(
      response => {
        _machineList = response
        // console.log(`checkMachineData response = `, _machineList)
        let _machine = _machineList.find(machine => (machine.machine_id == parseInt(this.paramMach)))

        if (_machine) {
          this.machineData = [_machine]
          // console.log(`_machineList.find(machine_id) = `, machine.machine_id)
        }
        else {
          // console.log('_machineList.find(machine_id) = "Not Found" ')
          this.goToHospital()
        }
      })
  }

  // --------- ดึงข้อมูล โรงพยาบาล ----------------------------
  getHospitalData() {
    let _hospitalList: Hospital[] = []
    this.httpClient.get<Hospital[]>(`http://localhost:3000/api/hospital`).subscribe(response => {
      _hospitalList = response.filter(param => param.hospital_short == this.paramHos)
      this.hospitalList = _hospitalList
      // console.log('this.hospitalList.hospital_id = ', this.hospitalList[0].hospital_id)
    })
  }

  // ------ดึงข้อมูลเครื่องจักรมาทั้งหมดจาก database--------------------------
  getAllMachineData(paramMach: number) {
    this.httpClient.get<Machine[]>('http://localhost:3000/api/machine')
      .subscribe(response => {
        // console.log('getAllMachineData (response) : ', response);
        this.machineList = response.filter(param => param.machine_hospital == paramMach);
        // console.log('getAllMachineData (filtered) : ', this.machineList);
      });
  }

  // -------ดึงข้อมูลเครื่องจักรที่มีในโรงพยาบาลนี้------------------------------
  getMachineByHos() {
    this.httpClient.get<MachineAndHospital[]>(`http://localhost:3000/api/machine_by_hos?hos_short=${this.paramHos}`).subscribe(response => {
      this.machListByHos = response
      // console.log('machListByHos data = ', this.machListByHos)
    })
  }












  // --------- ลองแบบ Dynamic function ที่ดึงมาจาก template_machine อันเก่า ---------------


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

  // -------- ลองทำ ngStyle แบบ dynamic กับค่าที่ดึงมาจาก postgres ------------------



  sensorBoxStatus(sensor_status: number) {
    if (sensor_status == 0) {
      return "box-status-0"
    }
    else if (sensor_status == 1) {
      return "box-status-1"
    }
    else {
      return "box-status-null"
    }
  }

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
  sensorBoxPositionNew(sensor_box_position_left: number, sensor_box_position_top: number) {
    if (sensor_box_position_left == null || sensor_box_position_top == null) {
      return null
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
      return null
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

  getPartImg(part_category: number) {
    if (part_category == 1) {
      return `assets/img/machine/machine-part-2-2-remove-num.png`
    }
    else if (part_category == 2) {
      return `assets/img/machine/machine-part-2-5-1-remove-num.png`
    }
    else if (part_category == 3) {
      return `assets/img/machine/srt1-reject.png`
    }
    else if (part_category == 4) {
      return `assets/img/machine/srt1-basket.png`
    }
    else if (part_category == 5) {
      return `assets/img/machine/srt1-start.png`
    }
    else {
      return `assets/img/machine/image-placeholder.png`
    }
  }

  // -------- ไปหน้า '/monitoring/:hos/:mach/:part' -----------------
  goToPart(part_id: number) {
    const urlPart = `/monitoring/${this.paramHos}/${this.paramMach}/${part_id}`
    this.router.navigateByUrl(urlPart)
  }
}
