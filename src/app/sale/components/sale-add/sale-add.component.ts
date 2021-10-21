import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMedicine, ISaleItem } from 'src/app/model';

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.scss']
})
export class SaleAddComponent implements OnInit {

  medicines: IMedicine[] = [
    { id: "1", name: "FAST&UP CHARGE", category: "Antibiotics", type: "Capsule", description: "" },
    { id: "1", name: "Trexgen Citron", category: "Antibiotics", type: "Tablet", description: "" },
    { id: "1", name: "FAST&UP CHARGE", category: "Antibiotics", type: "Drops", description: "" },
    { id: "1", name: "Vitamis", category: "Antibiotics", type: "Capsule", description: "" },
    { id: "1", name: "FAST&UP CHARGE", category: "Antibiotics", type: "Tablet", description: "" },
    { id: "1", name: "Trexgen Citron", category: "Antibiotics", type: "Drops", description: "" },
    { id: "1", name: "Vitamis", category: "Antibiotics", type: "Inhaler", description: "" },
    { id: "1", name: "Trexgen Citron Vitamin", category: "Antibiotics", type: "Tablet", description: "" },
  ];

  data: ISaleItem[] = [
    {
      id: "1",
      batch: {
        batchNo: "GJ4566266",
        expiryDate: new Date(),
        id: "",
        mfgDate: new Date(),
        quantity: 25
      },
      medicine: {
        category: "",
        description: "",
        id: "",
        name: "Trexgen Citron",
        type: ""
      },
      price: 253,
      quantity: 20,
      subTotalPrice: 30
    },
    {
      id: "1",
      batch: {
        batchNo: "LO596699",
        expiryDate: new Date(),
        id: "",
        mfgDate: new Date(),
        quantity: 25
      },
      medicine: {
        category: "",
        description: "",
        id: "",
        name: "FAST&UP CHARGE",
        type: ""
      },
      price: 253,
      quantity: 20,
      subTotalPrice: 30
    }
  ];

  displayedColumns: string[] = ['medicine', 'batchNumber', 'quantity', 'price', 'subTotalPrice', 'action',];
  dataSource!: MatTableDataSource<ISaleItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

}
