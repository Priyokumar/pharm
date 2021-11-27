import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IMedicineType } from '../../../model';
import { MedicineTypeService } from '../../services/medicine-type.service';
import { MedicineTypeAddComponent } from '../medicine-type-add/medicine-type-add.component';

@Component({
  selector: '[medicine-type-list]',
  templateUrl: './medicine-type-list.component.html',
  styleUrls: ['./medicine-type-list.component.scss'],
})
export class MedicineTypeListComponent implements OnInit, OnDestroy {
  data: IMedicineType[] = [];

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource!: MatTableDataSource<IMedicineType>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  getSubscription: Subscription;
  dialogSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private medicinrTypeService: MedicineTypeService
  ) {}

  ngOnInit() {
    this.getMedicineTypes();
  }

  ngOnDestroy(): void {
    if (this.getSubscription) this.getSubscription.unsubscribe();
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }

  getMedicineTypes() {
    this.getSubscription = this.medicinrTypeService
      .getMedicineTypes()
      .subscribe(
        (data) => {
          this.data = data;
          this.dataSource = new MatTableDataSource(this.data);
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

  addCategory() {
    this.dialogSubscription = this.dialog
      .open(MedicineTypeAddComponent)
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.ngOnInit();
        }
      });
  }

  remove(data: IMedicineType){
    this.medicinrTypeService.removeMedicineCategory(data.id).toPromise().then(_=>{
      this.getMedicineTypes();
    }).catch(err=>{
      console.log(err);
    });
  }
}
