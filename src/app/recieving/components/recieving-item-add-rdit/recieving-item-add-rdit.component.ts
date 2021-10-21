import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicineService } from 'src/app/medicine/services/medicine.service';
import { IMedicine, IRecievingItem } from 'src/app/model';

@Component({
  selector: 'app-recieving-item-add-rdit',
  templateUrl: './recieving-item-add-rdit.component.html',
  styleUrls: ['./recieving-item-add-rdit.component.scss']
})
export class RecievingItemAddRditComponent implements OnInit {

  medicines: IMedicine[] = [];

  fg: FormGroup
  medicine = new FormControl('', Validators.required);
  batchNumber = new FormControl('', Validators.required);
  expiryDate = new FormControl('', Validators.required);
  mfgDate = new FormControl('', Validators.required);
  costPrice = new FormControl('', Validators.required);
  sellingPrice = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<RecievingItemAddRditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRecievingItem,
    private medicineService: MedicineService
    ) {
      this.fg = new FormGroup({
        medicine: this.medicine,
        batchNumber: this.batchNumber,
        expiryDate: this.expiryDate,
        costPrice: this.costPrice,
        sellingPrice: this.sellingPrice,
        quantity: this.quantity
      });
      if (this.data) {
        this.setForm();
      }
     }

  ngOnInit() {
    this.getMedicines();
  }

  setForm() {
    this.medicine.setValue(this.data.medicine.id);
    this.batchNumber.setValue(this.data.batch.batchNo);
    this.mfgDate.setValue(this.data.batch.mfgDate);
    this.expiryDate.setValue(this.data.batch.expiryDate);
    this.costPrice.setValue(this.data.costPrice);
    this.sellingPrice.setValue(this.data.sellingPrice);
    this.quantity.setValue(this.data.batch.quantity);
  }

  getMedicines() {
    this.medicines = this.medicineService.getMedicines();
  }

  addItem() {
    const item : IRecievingItem = {
      batch:{
        batchNo: this.batchNumber.value,
        expiryDate: this.expiryDate.value,
        id: null,
        mfgDate: this.mfgDate.value,
        quantity: this.quantity.value
      },
      costPrice: this.costPrice.value,
      id:null,
      medicine: this.medicines.find(ele=>ele.id === this.medicine.value),
      sellingPrice: this.sellingPrice.value
    }
    this.dialogRef.close(item);
  }

}
