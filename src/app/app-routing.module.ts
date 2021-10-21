import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(module => { return module.DashboardModule }) },
  { path: "medicines", loadChildren: () => import("./medicine/medicine.module").then(module => { return module.MedicineModule }) },
  { path: "sales", loadChildren: () => import("./sale/sale.module").then(module => { return module.SaleModule }) },
  { path: "reports", loadChildren: () => import("./report/report.module").then(module => { return module.ReportModule }) },
  { path: "inventory", loadChildren: () => import("./inventory/inventory.module").then(module => { return module.InventoryModule }) },
  { path: "recieving", loadChildren: () => import("./recieving/recieving.module").then(module => { return module.RecievingModule }) },
  { path: "supplier", loadChildren: () => import("./supplier/supplier.module").then(module => { return module.SupplierModule }) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
