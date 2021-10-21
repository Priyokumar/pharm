import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IMedicineType } from 'src/app/model';
import { MedicineTypeService } from '../../services/medicine-type.service';

@Component({
  selector: 'app-medicine-type-add',
  templateUrl: './medicine-type-add.component.html',
  styleUrls: ['./medicine-type-add.component.scss']
})
export class MedicineTypeAddComponent implements OnInit {

  name = new FormControl('', Validators.required);

  constructor( public dialogRef: MatDialogRef<MedicineTypeAddComponent>,private medicinrTypeService:MedicineTypeService) { }

  ngOnInit() {
  }

  add(){
    const data : IMedicineType = {
      id: ''+ new Date().getTime(),
      name: this.name.value
    }
    this.medicinrTypeService.addMedicineType(data);
    this.dialogRef.close(data);
  }

}
