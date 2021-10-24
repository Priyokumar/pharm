import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IMedicine, IMedicineCategory, IMedicineType } from '../../../model';
import { MedicineCategoryService } from '../../services/medicine-category.service';
import { MedicineTypeService } from '../../services/medicine-type.service';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-medicine-add-edit',
  templateUrl: './medicine-add-edit.component.html',
  styleUrls: ['./medicine-add-edit.component.scss'],
})
export class MedicineAddEditComponent implements OnInit, OnDestroy {
  categories: IMedicineCategory[] = [];
  types: IMedicineType[] = [];

  fg: FormGroup;
  name = new FormControl('', Validators.required);
  description = new FormControl('', null);
  category = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  typesSubscription: Subscription;
  categoriesSubscription: Subscription;
  inProgress = false;

  constructor(
    public dialogRef: MatDialogRef<MedicineAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMedicine,
    private medicineService: MedicineService,
    private medicineCategoryService: MedicineCategoryService,
    private medicinrTypeService: MedicineTypeService
  ) {
    this.fg = new FormGroup({
      name: this.name,
      description: this.description,
      category: this.category,
      type: this.type,
    });

    if (this.data) {
      this.setForm();
    }
  }
  ngOnDestroy(): void {
    if (this.typesSubscription) this.typesSubscription.unsubscribe();
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }
  setForm() {
    this.name.setValue(this.data.name);
    this.description.setValue(this.data.name);
    this.category.setValue(this.data.category);
    this.type.setValue(this.data.type);
  }

  ngOnInit() {
    this.getCategories();
    this.getTypes();
  }

  getTypes() {
    this.typesSubscription = this.medicinrTypeService
      .getMedicineTypes()
      .subscribe(
        (data) => {
          this.types = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCategories() {
    this.categoriesSubscription = this.medicineCategoryService
      .getMedicineCategories()
      .subscribe(
        (data) => {
          this.categories = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addEdit() {
    this.inProgress = true;
    const payload: IMedicine = this.fg.value;
    if (this.data) {
      payload.id = '' + this.data.id;
      this.medicineService.updateMedicine(payload, this.data.id);
    } else {
      payload.id = '' + new Date().getTime();
      this.medicineService.addMedicine(payload);
    }
    this.dialogRef.close('ok');
  }
}
