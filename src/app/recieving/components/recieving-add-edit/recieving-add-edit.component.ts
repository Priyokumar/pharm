import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRecieving, IRecievingItem, ISupplier } from 'src/app/model';
import { SupplierService } from 'src/app/supplier/services/supplier.service';
import { RecievingService } from '../../services/recieving.service';
import { RecievingItemAddRditComponent } from '../recieving-item-add-rdit/recieving-item-add-rdit.component';

@Component({
  selector: 'app-recieving-add-edit',
  templateUrl: './recieving-add-edit.component.html',
  styleUrls: ['./recieving-add-edit.component.scss']
})
export class RecievingAddEditComponent implements OnInit {

  suppliers: ISupplier[] = [];

  fg: FormGroup;
  supplier = new FormControl('', Validators.required);
  recievedBy = new FormControl('', Validators.required);
  recievedDate = new FormControl('', Validators.required);

  items: IRecievingItem[] = [];

  displayedColumns: string[] = ['medicine', 'batch', 'costPrice', 'sellingPrice', 'action'];
  dataSource!: MatTableDataSource<IRecievingItem>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private supplierService: SupplierService,
    private recievingService: RecievingService,
    private snackBar: MatSnackBar
    ) {
      this.fg = new FormGroup({
        supplier: this.supplier,
        recievedBy: this.recievedBy,
        recievedDate: this.recievedDate
      });
     }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.getSuppliers();
  }

  getSuppliers() {
    this.suppliers = this.supplierService.getSuppliers();
  }

  addItem() {
    this.dialog.open(RecievingItemAddRditComponent,{width:"35%"}).afterClosed().subscribe((data: IRecievingItem)=>{
      if(data){
        const t = this.items.find(ele=> {
          return ele.medicine.id === data.medicine.id && ele.batch.batchNo === data.batch.batchNo;
        })
        if(t) {
          this.snackBar.open("Item already exists", "Got it!", {duration: 7000});
          return;
        }
        this.items.unshift(data);
        this.dataSource.data = this.items;
      }
    })
  }

  editItem(data: IRecievingItem, index: number) {
    this.dialog.open(RecievingItemAddRditComponent,{width:"35%", data: data}).afterClosed().subscribe((data: IRecievingItem)=>{
      if(data){
        const t = this.items.find(ele=> {
          return ele.medicine.id === data.medicine.id && ele.batch.batchNo === data.batch.batchNo;
        })
        if(t) {
          this.snackBar.open("Item already exists", "Got it!", {duration: 7000});
          return;
        }
        this.items[index] = data;
        this.dataSource.data = this.items;
      }
    })
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.dataSource.data = this.items;
  }

  save(){
    const payLoad : IRecieving = {
      id: null,
      items: this.items,
      recievedBy : this.recievedBy.value,
      recievedDate: this.recievedDate.value,
      supplier : this.suppliers.find(ele=>ele.id === this.supplier.value)
    }
    this.recievingService.addRecieving(payLoad)
  }

}
