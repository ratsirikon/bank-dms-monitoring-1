import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-sensor',
  templateUrl: './edit-sensor.component.html',
  styleUrls: ['./edit-sensor.component.scss']
})
export class EditSensorComponent {

  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      rows: this.fb.array([]),
    });

    // Add an initial row
    this.addRow();
  }

  goToHome() {
    const pathUrl = `/home`
    window.location.href = pathUrl
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

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  addRow() {
    const row = this.fb.group({
      name: [''],
      sBoxLeft: [''],
      sBoxTop: [''],
      sLineLength: [''],
      sLineLeft: [''],
      sLineTop: [''],
      sLineRotation: [''],
    });

    this.rows.push(row);
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
  }


  sensorBoxPosition(sensor_box_position_left: number, sensor_box_position_top: number) {
    if (sensor_box_position_left == null && sensor_box_position_top == null) {
      return {
        'position': `absolute`,
        'left': `0`,
        'top': `0`
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

  sensorLinePosition(sensor_line_length: number, sensor_line_position_left: number, sensor_line_position_top: number, sensor_line_rotation: number) {
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
