import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IInventory, ISupplier } from 'src/app/model';
import { SupplierService } from '../../services/supplier.service';
import { SupplierAddEditComponent } from '../supplier-add-edit/supplier-add-edit.component';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit {

  data: ISupplier[] = [];
  displayedColumns: string[] = ['name', 'address', 'contactPerson', 'contactNumber', 'isActive', 'action'];
  dataSource!: MatTableDataSource<ISupplier>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private supplierService: SupplierService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.getSuppliers();
    }, 0)
  }

  getSuppliers() {
    this.data = this.supplierService.getSuppliers();
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

  addSupplier() {
    this.dialog.open(SupplierAddEditComponent, { width: "35%" }).afterClosed().subscribe(
      data => {
        if (data) {
          this.getSuppliers();
        }
      }
    )
  }

  editSupplier(supplier: ISupplier) {
    console.log(supplier);
    this.dialog.open(SupplierAddEditComponent, { data: supplier, width: "35%" }).afterClosed().subscribe(
      data => {
        if (data) {
          this.getSuppliers();
        }
      }
    )
  }
}
