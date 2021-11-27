import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IMedicineCategory, IMedicineType } from '../../../model';
import { MedicineCategoryService } from '../../services/medicine-category.service';
import { MedicineCategoryAddComponent } from '../medicine-category-add/medicine-category-add.component';
import { MedicineTypeAddComponent } from '../medicine-type-add/medicine-type-add.component';

@Component({
  selector: '[medicine-category-list]',
  templateUrl: './medicine-category-list.component.html',
  styleUrls: ['./medicine-category-list.component.scss']
})
export class MedicineCategoryListComponent implements OnInit, OnDestroy {

  data: IMedicineCategory[] = [];

  displayedColumns: string[] = ['id', 'name', 'action',];
  dataSource!: MatTableDataSource<IMedicineType>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  getSubscription: Subscription;

  constructor(private dialog: MatDialog,private medicineCategoryService:MedicineCategoryService) { }

  ngOnInit() {
    this.getMedicineCategories();
  }

  ngOnDestroy(): void {
    if(this.getSubscription) this.getSubscription.unsubscribe();
  }

  getMedicineCategories() {
    this.getSubscription = this.medicineCategoryService
      .getMedicineCategories()
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
    this.dialog.open(MedicineCategoryAddComponent).afterClosed().subscribe(data=>{
      if(data){
        this.getMedicineCategories();
      }
    });
  }

  remove(data: IMedicineCategory){
    this.medicineCategoryService.removeMedicineCategory(data.id).toPromise().then(_=>{
      this.getMedicineCategories();
    }).catch(err=>{
      console.log(err);
    });
  }

}
