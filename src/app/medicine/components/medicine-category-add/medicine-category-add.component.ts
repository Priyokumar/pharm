import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMedicineCategory } from 'src/app/model';
import { MedicineCategoryService } from '../../services/medicine-category.service';
import { MedicineTypeService } from '../../services/medicine-type.service';

@Component({
  selector: 'app-medicine-category-add',
  templateUrl: './medicine-category-add.component.html',
  styleUrls: ['./medicine-category-add.component.scss']
})
export class MedicineCategoryAddComponent implements OnInit {

  name = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<MedicineCategoryAddComponent>,
    private medicineCategoryService: MedicineCategoryService
  ) { }

  ngOnInit() {
  }

  add() {
    const data: IMedicineCategory = {
      id: '' + new Date().getTime(),
      name: this.name.value
    }
    this.medicineCategoryService.addMedicineCategory(data);
    this.dialogRef.close(data);
  }
}
