import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISupplier } from 'src/app/model';
import { SupplierService } from '../../services/supplier.service';

@Component({
  selector: 'app-supplier-add-edit',
  templateUrl: './supplier-add-edit.component.html',
  styleUrls: ['./supplier-add-edit.component.scss']
})
export class SupplierAddEditComponent implements OnInit {

  fg: FormGroup
  name = new FormControl('', Validators.required);
  contactPerson = new FormControl('', null);
  contactNo = new FormControl('', null);
  address = new FormControl('', Validators.required);
  isActive = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<SupplierAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISupplier, private supplierService: SupplierService) {
    this.fg = new FormGroup({
      name: this.name,
      contactPerson: this.contactPerson,
      contactNo: this.contactNo,
      address: this.address,
      isActive: this.isActive
    });
    if (this.data) {
      this.setForm();
    }
  }

  ngOnInit() {
  }

  setForm() {
    this.name.setValue(this.data.name);
    this.contactPerson.setValue(this.data.contactPerson);
    this.contactNo.setValue(this.data.contactNo);
    this.address.setValue(this.data.address);
    this.isActive.setValue(this.data.isActive);
  }

  addEdit() {
    const payload: ISupplier = this.fg.value;
    if (this.data) {
      payload.id = '' + this.data.id;
      this.supplierService.updateSupplier(payload, this.data.id);
    } else {
      payload.id = '' + new Date().getTime();
      this.supplierService.addSupplier(payload);
    }
    this.dialogRef.close("ok");
  }

}
