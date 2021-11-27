import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMedicineCategory } from 'src/app/model';
import { MedicineCategoryService } from '../../services/medicine-category.service';

@Component({
  selector: 'app-medicine-category-add',
  templateUrl: './medicine-category-add.component.html',
  styleUrls: ['./medicine-category-add.component.scss'],
})
export class MedicineCategoryAddComponent implements OnInit {
  name = new FormControl('', Validators.required);
  inProgress = false;

  constructor(
    public dialogRef: MatDialogRef<MedicineCategoryAddComponent>,
    private medicineCategoryService: MedicineCategoryService
  ) {}

  ngOnInit() {}

  add() {
    this.inProgress = true;
    const data: IMedicineCategory = {
      name: this.name.value,
    };
    this.medicineCategoryService
      .addMedicineCategory(data).toPromise()
      .then((data) => {
        this.inProgress = false;
        console.log('Data added', data);
        this.dialogRef.close(data);
      })
      .catch((err) => {
        this.inProgress = false;
        console.log(err);
      });
  }
}
