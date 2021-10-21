import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { InventoryAddEditComponent } from './components/inventory-add-edit/inventory-add-edit.component';

const routes: Routes = [
  {
    path: "", component: InventoryListComponent
  }
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
    InventoryListComponent,
    InventoryAddEditComponent
  ]
})
export class InventoryModule { }
