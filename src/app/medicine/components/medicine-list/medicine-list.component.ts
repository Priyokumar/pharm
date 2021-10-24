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
import { IMedicine } from '../../../model';
import { MedicineService } from '../../services/medicine.service';
import { MedicineAddEditComponent } from '../medicine-add-edit/medicine-add-edit.component';

@Component({
  selector: '[medicine-list]',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
})
export class MedicineListComponent implements OnInit, AfterViewInit, OnDestroy {
  data: IMedicine[] = [];

  displayedColumns: string[] = ['name', 'category', 'type', 'action'];
  dataSource!: MatTableDataSource<IMedicine>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  medicinesSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private medicineService: MedicineService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    if (this.medicinesSubscription) this.medicinesSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getMedicines();
    }, 0);
  }

  getMedicines() {
    this.medicinesSubscription = this.medicineService.getMedicines().subscribe(
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

  addMedicine() {
    this.dialog
      .open(MedicineAddEditComponent, { width: '25%' })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getMedicines();
        }
      });
  }

  editMedicine(inventory: IMedicine) {
    console.log(inventory);
    this.dialog
      .open(MedicineAddEditComponent, { data: inventory, width: '35%' })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.getMedicines();
        }
      });
  }

  remove(data: IMedicine) {
    this.medicineService
      .removeMedicine(data.id)
      .then((_) => {
        this.getMedicines();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
