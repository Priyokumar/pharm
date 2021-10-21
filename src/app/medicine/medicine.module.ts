import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineComponent } from './medicine.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { MedicineCategoryListComponent } from './components/medicine-category-list/medicine-category-list.component';
import { MedicineTypeListComponent } from './components/medicine-type-list/medicine-type-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicineCategoryAddComponent } from './components/medicine-category-add/medicine-category-add.component';
import { MedicineTypeAddComponent } from './components/medicine-type-add/medicine-type-add.component';
import { MedicineAddEditComponent } from './components/medicine-add-edit/medicine-add-edit.component';

const routes: Routes = [
  { path: "", component: MedicineComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MedicineComponent,
    MedicineListComponent,
    MedicineCategoryListComponent,
    MedicineTypeListComponent,
    MedicineCategoryAddComponent,
    MedicineTypeAddComponent,
    MedicineAddEditComponent
  ]
})
export class MedicineModule { }
