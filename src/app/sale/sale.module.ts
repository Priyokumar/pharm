import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { SaleAddComponent } from './components/sale-add/sale-add.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';

const routes: Routes = [
  { path: "", component: SaleAddComponent },
  { path: "add", component: SaleListComponent },
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
    SaleAddComponent,
    SaleListComponent
  ]
})
export class SaleModule { }
