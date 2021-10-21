import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IMedicineType } from '../../../model';
import { MedicineTypeService } from '../../services/medicine-type.service';
import { MedicineTypeAddComponent } from '../medicine-type-add/medicine-type-add.component';

@Component({
  selector: '[medicine-type-list]',
  templateUrl: './medicine-type-list.component.html',
  styleUrls: ['./medicine-type-list.component.scss']
})
export class MedicineTypeListComponent implements OnInit {

  data: IMedicineType[] = [];

  displayedColumns: string[] = ['id', 'name', 'action',];
  dataSource!: MatTableDataSource<IMedicineType>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private medicinrTypeService:MedicineTypeService) { }

  ngOnInit() {
    this.data = this.medicinrTypeService.getMedicineTypes();
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
    this.dialog.open(MedicineTypeAddComponent).afterClosed().subscribe(data=>{
      if(data){
        this.ngOnInit();
      }
    });
  }

}
