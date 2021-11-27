import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IInventory, IMedicine } from 'src/app/model';

@Component({
  selector: 'app-inventory-add-edit',
  templateUrl: './inventory-add-edit.component.html',
  styleUrls: ['./inventory-add-edit.component.scss']
})
export class InventoryAddEditComponent implements OnInit {
  medicines: IMedicine[] = [];
  constructor(public dialogRef: MatDialogRef<InventoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInventory) { }

  ngOnInit() {
  }

}
