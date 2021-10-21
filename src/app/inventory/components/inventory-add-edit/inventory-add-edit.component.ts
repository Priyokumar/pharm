import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IInventory, IMedicine } from 'src/app/model';

@Component({
  selector: 'app-inventory-add-edit',
  templateUrl: './inventory-add-edit.component.html',
  styleUrls: ['./inventory-add-edit.component.scss']
})
export class InventoryAddEditComponent implements OnInit {

  medicines: IMedicine[] = [
    { id: "1", name: "FAST&UP CHARGE", category: "Antibiotics", type: "Capsule", description: "" },
    { id: "1", name: "Trexgen Citron", category: "Antibiotics", type: "Tablet", description: "" },
    { id: "1", name: "FAST&UP CHARGE", category: "Antibiotics", type: "Drops", description: "" },
    { id: "1", name: "Vitamis", category: "Antibiotics", type: "Capsule", description: "" },
    { id: "1", name: "FAST&UP CHARGE", category: "Antibiotics", type: "Tablet", description: "" },
    { id: "1", name: "Trexgen Citron", category: "Antibiotics", type: "Drops", description: "" },
    { id: "1", name: "Vitamis", category: "Antibiotics", type: "Inhaler", description: "" },
    { id: "1", name: "Trexgen Citron Vitamin", category: "Antibiotics", type: "Tablet", description: "" },
  ]


  constructor(public dialogRef: MatDialogRef<InventoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInventory) { }

  ngOnInit() {
  }

}
