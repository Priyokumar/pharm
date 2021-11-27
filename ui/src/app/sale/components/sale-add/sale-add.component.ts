import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MedicineService } from 'src/app/medicine/services/medicine.service';
import { IMedicine, ISale, ISaleItem } from 'src/app/model';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.scss'],
})
export class SaleAddComponent implements OnInit {
  medicines: IMedicine[] = [];
  medicine = new FormControl('', Validators.required);
  batchNo = new FormControl('', Validators.required);

  cName = new FormControl('', Validators.required);
  cMobileNo = new FormControl('', null);
  cAddress = new FormControl('', null);

  totalAmount = 0;

  fg: FormGroup;
  displayedColumns: string[] = [
    'sl',
    'medicine',
    'batchNumber',
    'quantity',
    'price',
    'subTotalPrice',
    'action',
  ];
  dataSource!: MatTableDataSource<ISaleItem>;
  items: ISaleItem[] = [];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  addingItem = false;
  addingSale = false;

  constructor(
    private medicineService: MedicineService,
    private saleService: SaleService,
    private router: Router
  ) {
    this.fg = new FormGroup({
      cName: this.cName,
      cMobileNo: this.cMobileNo,
      cAddress: this.cAddress,
    });
  }

  ngOnInit() {
    this.getMedicines();
  }

  getMedicines() {
    this.medicineService
      .getMedicines()
      .toPromise()
      .then((data) => {
        this.medicines = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addItem() {
    console.log(this.fg.value);
    this.addingItem = true;
    this.saleService
      .getInventoryByBatch(this.batchNo.value)
      .toPromise()
      .then((data) => {
        this.addingItem = false;
        const item: ISaleItem = {
          inventory: data,
          price: data.sellingPrice,
          quantity: 1,
          subTotalPrice: data.sellingPrice,
        };
        this.totalAmount += item.subTotalPrice;
        this.items.push(item);
        this.dataSource = new MatTableDataSource(this.items);
        this.calculateTotalAmount();
      })
      .catch((error) => {
        this.addingItem = false;
        console.log(error);
      });
  }

  delete(i: number) {
    this.items.splice(i, 1);
    this.dataSource.data = this.items;
  }

  proceedSale() {
    const payload: ISale = {
      customer: {
        name: this.cName.value,
        address: this.cAddress.value,
        mobileNo: this.cMobileNo.value,
      },
      items: this.items,
      totalAmount: this.totalAmount,
    };
    console.log(payload);
    this.addingSale = true;
    this.saleService
      .addSale(payload)
      .toPromise()
      .then((data) => {
        this.addingSale = false;
        this.router.navigate(['/sales/list']);
      })
      .catch((error) => {
        this.addingSale = false;
        console.log(error);
      });
  }

  calculateTotalAmount() {
    let t = 0;
    this.items.forEach((ele) => {
      t += ele.subTotalPrice;
    });
    this.totalAmount = t;
  }

  quantityChange(i, target: any) {
    const q = parseInt(target.value);
    this.items[i].quantity = q;
    this.items[i].subTotalPrice = this.items[i].quantity * this.items[i].price;
    this.dataSource.data = this.items;
    this.calculateTotalAmount();
  }

  change(s: any) {
    console.log(s.value);
    this.addingItem = true;
    this.saleService
      .getInventoryByBatch(s.value)
      .toPromise()
      .then((data) => {
        this.addingItem = false;
        const item: ISaleItem = {
          inventory: data,
          price: data.sellingPrice,
          quantity: 1,
          subTotalPrice: data.sellingPrice,
        };
        const dupItem = this.items.find(
          (ele) => ele.inventory.batchNo === item.inventory.batchNo
        );
        if (dupItem) {
          dupItem.quantity++;
          dupItem.subTotalPrice = dupItem.price * dupItem.quantity;
        } else {
          this.totalAmount += item.subTotalPrice;
          this.items.push(item);
          this.dataSource = new MatTableDataSource(this.items);
        }
        this.calculateTotalAmount();
        this.batchNo.setValue(null);
      })
      .catch((error) => {
        this.addingItem = false;
        console.log(error);
      });
  }
}
