import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap, take, takeLast } from 'rxjs/operators';
import { InventoryService } from 'src/app/inventory/services/inventory.service';
import { IRecieving, IRecievingItem, ISupplier } from 'src/app/model';
import { SupplierService } from 'src/app/supplier/services/supplier.service';
import { RecievingToInventoryService } from '../../services/recieving-to-inventory.service';
import { RecievingService } from '../../services/recieving.service';
import { RecievingItemAddRditComponent } from '../recieving-item-add-rdit/recieving-item-add-rdit.component';

@Component({
  selector: 'app-recieving-add-edit',
  templateUrl: './recieving-add-edit.component.html',
  styleUrls: ['./recieving-add-edit.component.scss'],
})
export class RecievingAddEditComponent implements OnInit, OnDestroy {
  suppliers: ISupplier[] = [];

  fg: FormGroup;
  supplier = new FormControl('', Validators.required);
  recievedBy = new FormControl('', Validators.required);
  recievedDate = new FormControl('', Validators.required);

  items: IRecievingItem[] = [];

  displayedColumns: string[] = [
    'medicine',
    'batch',
    'costPrice',
    'sellingPrice',
    'action',
  ];
  dataSource!: MatTableDataSource<IRecievingItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  suppliersubscription: Subscription;
  inProgress = false;
  dialogSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private recievingService: RecievingService,
    private snackBar: MatSnackBar,
    private router: Router,
    private recievingToInventoryService: RecievingToInventoryService,
    private inventoryService: InventoryService
  ) {
    this.fg = new FormGroup({
      supplier: this.supplier,
      recievedBy: this.recievedBy,
      recievedDate: this.recievedDate,
    });
  }

  ngOnDestroy(): void {
    if (this.suppliersubscription) this.suppliersubscription.unsubscribe();
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.getSuppliers();
  }

  getSuppliers() {
    this.suppliersubscription = this.supplierService.getSuppliers().subscribe(
      (data) => {
        this.suppliers = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItem() {
    this.dialogSubscription = this.dialog
      .open(RecievingItemAddRditComponent, { width: '35%' })
      .afterClosed()
      .subscribe((data: IRecievingItem) => {
        if (data) {
          const t = this.items.find((ele) => {
            return (
              ele.product.id === data.product.id &&
              ele.batchNo === data.batchNo
            );
          });
          if (t) {
            this.snackBar.open('Item already exists', 'Got it!', {
              duration: 7000,
            });
            return;
          }
          this.items.unshift(data);
          this.dataSource.data = this.items;
        }
      });
  }

  editItem(data: IRecievingItem, index: number) {
    this.dialogSubscription = this.dialog
      .open(RecievingItemAddRditComponent, { width: '35%', data: data })
      .afterClosed()
      .subscribe((data: IRecievingItem) => {
        if (data) {
          this.items[index] = data;
          this.dataSource.data = this.items;
        }
      });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.dataSource.data = this.items;
  }

  async save() {
    const payLoad: IRecieving = {
      items: this.items,
      recievedBy: this.recievedBy.value,
      recievedDate: this.recievedDate.value
        ? new Date(this.recievedDate.value).toDateString()
        : null,
      supplier: this.suppliers.find((ele) => ele.id === this.supplier.value),
    };
  this.recievingService
      .addRecieving(payLoad).toPromise()
      .then(
        (data) => {
          this.inProgress = false;
          console.log('Data added', data);
          this.router.navigate(['/recievings']);
        }
      ).catch((error) => {
        console.log(error);
        this.inProgress = false;
        this.snackBar.open('Something went wrong ):', 'ok', {
          duration: 7000,
        });
      });
  }
}
