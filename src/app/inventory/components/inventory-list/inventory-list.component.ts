import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IInventory } from 'src/app/model';
import { InventoryAddEditComponent } from '../inventory-add-edit/inventory-add-edit.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit, AfterViewInit {

  data: IInventory[] = [
    {
      id: "",
      costPrice: 2356,
      sellingPrice: 2369,
      isExpired: true,
      medicine: {
        id: "",
        name: "FAST&UP CHARGE	",
        category: "Vitamins",
        description: "FAST&UP CHARGE",
        type: "Capsule"
      },
      batches: [
        {
          id: "",
          batchNo: "rrrr",
          quantity: 5,
          expiryDate: new Date(),
          mfgDate: new Date()
        },
        {
          id: "",
          batchNo: "rrrr",
          quantity: 5,
          expiryDate: new Date(),
          mfgDate: new Date()
        }
      ],
      stockAvailable: 200
    },
    {
      id: "",
      costPrice: 34,
      sellingPrice: 50,
      isExpired: true,
      medicine: {
        id: "",
        name: "	Trexgen Citron Vitamin C",
        category: "Vitamins",
        description: "Trexgen Citron Vitamin C",
        type: "Capsule"
      },
      batches: [
        {
          id: "",
          batchNo: "sss",
          quantity: 5,
          expiryDate: new Date(),
          mfgDate: new Date()
        }
      ],
      stockAvailable: 200
    }
  ]

  displayedColumns: string[] = ['name', 'category', 'type', 'price', 'isExpired', 'stockAvailable','batch', 'action'];
  dataSource!: MatTableDataSource<IInventory>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addInventory() {
    this.dialog.open(InventoryAddEditComponent, { width: "35%" })
  }

  editInventory(inventory: IInventory) {
    console.log(inventory);
    this.dialog.open(InventoryAddEditComponent, { data: inventory, width: "35%" })
  }

}
