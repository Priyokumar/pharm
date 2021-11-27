import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MedicineService } from 'src/app/medicine/services/medicine.service';
import { IMedicine, IRecievingItem } from 'src/app/model';

@Component({
  selector: 'app-recieving-item-add-rdit',
  templateUrl: './recieving-item-add-rdit.component.html',
  styleUrls: ['./recieving-item-add-rdit.component.scss'],
})
export class RecievingItemAddRditComponent implements OnInit, OnDestroy {
  medicines: IMedicine[] = [];

  fg: FormGroup;
  medicine = new FormControl('', Validators.required);
  batchNumber = new FormControl('', Validators.required);
  expiryDate = new FormControl('', Validators.required);
  mfgDate = new FormControl('', Validators.required);
  costPrice = new FormControl('', Validators.required);
  sellingPrice = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  medicinesSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<RecievingItemAddRditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecievingItem,
    private medicineService: MedicineService
  ) {
    this.fg = new FormGroup({
      medicine: this.medicine,
      batchNumber: this.batchNumber,
      expiryDate: this.expiryDate,
      costPrice: this.costPrice,
      sellingPrice: this.sellingPrice,
      quantity: this.quantity,
    });
    if (this.data) {
      this.setForm();
    }
  }

  ngOnInit() {
    this.getMedicines();
  }

  ngOnDestroy(): void {
    if (this.medicinesSubscription) this.medicinesSubscription.unsubscribe();
  }

  setForm() {
    this.medicine.setValue(this.data.product.id);
    this.batchNumber.setValue(this.data.batchNo);
    this.mfgDate.setValue(this.data.mfgDate);
    this.expiryDate.setValue(this.data.expiryDate);
    this.costPrice.setValue(this.data.costPrice);
    this.sellingPrice.setValue(this.data.sellingPrice);
    this.quantity.setValue(this.data.quantity);
  }

  getMedicines() {
    this.medicinesSubscription = this.medicineService.getMedicines().subscribe(
      (data) => {
        this.medicines = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItem() {
    const item: IRecievingItem = {
      costPrice: this.costPrice.value,
      product: this.medicines.find((ele) => ele.id === this.medicine.value),
      sellingPrice: this.sellingPrice.value,
      mfgDate: this.mfgDate.value,
      quantity: this.quantity.value,
      batchNo: this.batchNumber.value,
      expiryDate: this.expiryDate.value,
    };
    this.dialogRef.close(item);
  }
}
