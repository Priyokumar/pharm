import { SalesTimelineComponent } from './sales-timeline/sales-timeline.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from '../auth/services/login-guard.service';
import { TodaySalesComponent } from './today-sales/today-sales.component';
import { YesterdaySalesComponent } from './yesterday-sales/yesterday-sales.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { RecievingsComponent } from './recievings/recievings.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [LoginGuardService],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    TodaySalesComponent,
    YesterdaySalesComponent,
    SuppliersComponent,
    RecievingsComponent,
    MedicinesComponent,
    DashboardLayoutComponent,
    SalesTimelineComponent
  ],
})
export class DashboardModule {}
