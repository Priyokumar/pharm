import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMedicineCategory, IMedicineType } from '../../../model';
import { MedicineCategoryService } from '../../services/medicine-category.service';
import { MedicineCategoryAddComponent } from '../medicine-category-add/medicine-category-add.component';
import { MedicineTypeAddComponent } from '../medicine-type-add/medicine-type-add.component';

@Component({
  selector: '[medicine-category-list]',
  templateUrl: './medicine-category-list.component.html',
  styleUrls: ['./medicine-category-list.component.scss']
})
export class MedicineCategoryListComponent implements OnInit {

  data: IMedicineCategory[] = [];

  displayedColumns: string[] = ['id', 'name', 'action',];
  dataSource!: MatTableDataSource<IMedicineType>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog,private medicineCategoryService:MedicineCategoryService) { }

  ngOnInit() {
    this.data = this.medicineCategoryService.getMedicineCategories();
    this.dataSource = new MatTableDataSource(this.data);
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
        this.ngOnInit();
      }
    });
  }

  remove(data: IMedicineCategory){
    this.medicineCategoryService.removeMedicineCategory(data.id);
    this.ngOnInit();
  }

}
