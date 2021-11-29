import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  active = new FormControl('', Validators.required);
  inProgress = false;

  constructor(public dialogRef: MatDialogRef<SupplierAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISupplier, private supplierService: SupplierService) {
    this.fg = new FormGroup({
      name: this.name,
      contactPerson: this.contactPerson,
      contactNo: this.contactNo,
      address: this.address,
      active: this.active
    });
    this.active.setValue(false);
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
    this.active.setValue(this.data.active);
  }

  addEdit() {
    this.inProgress = true;
    const payload: ISupplier = this.fg.value;
    let pr:Observable<any>;
    if (this.data) {
      pr = this.supplierService.updateSupplier(this.data.id, payload);
    } else {
      pr = this.supplierService.addSupplier(payload);
    }

    pr.toPromise().then((data) => {
      this.inProgress = false;
      console.log('Data added', data);
      this.dialogRef.close(data);
    })
    .catch((err) => {
      this.inProgress = false;
      console.log(err);
      this.dialogRef.close("ok");
    });

  }

}
