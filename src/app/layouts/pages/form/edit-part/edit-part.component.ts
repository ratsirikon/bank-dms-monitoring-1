import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss']
})
export class EditPartComponent {

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
    else if (part_category == null) {
      return `assets/img/machine/image-placeholder.png`
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
      part_order_no: [''],
      part_name: [''],
    });

    this.rows.push(row);
  }

  removeRow(index: number) {
    this.rows.removeAt(index);
  }
  
}
