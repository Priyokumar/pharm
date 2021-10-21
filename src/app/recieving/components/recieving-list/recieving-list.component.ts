import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryAddEditComponent } from 'src/app/inventory/components/inventory-add-edit/inventory-add-edit.component';
import { IInventory, IRecieving } from 'src/app/model';
import { RecievingService } from '../../services/recieving.service';

@Component({
  selector: 'app-recieving-list',
  templateUrl: './recieving-list.component.html',
  styleUrls: ['./recieving-list.component.scss']
})
export class RecievingListComponent implements OnInit {

  data: IRecieving[] = [];

  displayedColumns: string[] = ['supplier', 'items', 'recievedDate', 'recievedBy', 'action'];
  dataSource!: MatTableDataSource<IRecieving>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private recievingService: RecievingService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.getRecievings();
    }, 0)
  }

  getRecievings() {
    this.data = this.recievingService.getRecievings();
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

  addRecieving() {
    this.dialog.open(InventoryAddEditComponent, { width: "35%" }).afterClosed().subscribe(
      data => {
        if (data) {
          this.getRecievings();
        }
      }
    )
  }

  editRecieving(inventory: IInventory) {
    console.log(inventory);
    this.dialog.open(InventoryAddEditComponent, { data: inventory, width: "35%" }).afterClosed().subscribe(
      data => {
        if (data) {
          this.getRecievings();
        }
      }
    )
  }
}
