import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SupplierAddEditComponent } from './components/supplier-add-edit/supplier-add-edit.component';

const routes: Routes = [
  { path: "", component: SupplierListComponent }
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
    SupplierListComponent,
    SupplierAddEditComponent
  ]
})
export class SupplierModule { }
