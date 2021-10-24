import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IInventory } from 'src/app/model';
import { InventoryService } from '../../services/inventory.service';
import { InventoryAddEditComponent } from '../inventory-add-edit/inventory-add-edit.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'name',
    'category',
    'type',
    'price',
    'isExpired',
    'stockAvailable',
    'batch',
  ];
  dataSource!: MatTableDataSource<IInventory>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  inventoriesSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getInventories();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.inventoriesSubscription)
      this.inventoriesSubscription.unsubscribe();
  }

  getInventories() {
    this.inventoriesSubscription = this.inventoryService
      .getInventories()
      .subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data);
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

  addInventory() {
    this.dialog
      .open(InventoryAddEditComponent, { width: '35%' })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getInventories();
        }
      });
  }

  editInventory(inventory: IInventory) {
    console.log(inventory);
    this.dialog
      .open(InventoryAddEditComponent, { data: inventory, width: '35%' })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getInventories();
        }
      });
  }

  removeItem(data: IInventory) {
    this.inventoryService.removeInventory(data.id);
    this.getInventories();
  }
}
