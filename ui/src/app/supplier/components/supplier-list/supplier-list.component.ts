import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ISupplier } from 'src/app/model';
import { SupplierService } from '../../services/supplier.service';
import { SupplierAddEditComponent } from '../supplier-add-edit/supplier-add-edit.component';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit, OnDestroy {
  data: ISupplier[] = [];
  displayedColumns: string[] = [
    'name',
    'address',
    'contactPerson',
    'contactNumber',
    'isActive',
    'action',
  ];
  dataSource!: MatTableDataSource<ISupplier>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  suppliersubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getSuppliers();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.suppliersubscription) this.suppliersubscription.unsubscribe();
  }

  getSuppliers() {
    this.suppliersubscription = this.supplierService.getSuppliers().subscribe(
      (data) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addSupplier() {
    this.dialog
      .open(SupplierAddEditComponent, { width: '35%', disableClose: true })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getSuppliers();
        }
      });
  }

  editSupplier(supplier: ISupplier) {
    console.log(supplier);
    this.dialog
      .open(SupplierAddEditComponent, {
        data: supplier,
        width: '35%',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getSuppliers();
        }
      });
  }

  remove(data: ISupplier) {
    this.supplierService
      .removeSupplier(data.id)
      .toPromise()
      .then((_) => {
        this.getSuppliers();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
