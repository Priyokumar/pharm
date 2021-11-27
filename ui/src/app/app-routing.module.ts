import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "/auth/login", pathMatch: "full" },
  { path: "auth", loadChildren: () => import("./auth/auth.module").then(module => { return module.AuthModule }) },
  { path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(module => { return module.DashboardModule }) },
  { path: "medicines", loadChildren: () => import("./medicine/medicine.module").then(module => { return module.MedicineModule }) },
  { path: "sales", loadChildren: () => import("./sale/sale.module").then(module => { return module.SaleModule }) },
  { path: "reports", loadChildren: () => import("./report/report.module").then(module => { return module.ReportModule }) },
  { path: "inventories", loadChildren: () => import("./inventory/inventory.module").then(module => { return module.InventoryModule }) },
  { path: "recievings", loadChildren: () => import("./recieving/recieving.module").then(module => { return module.RecievingModule }) },
  { path: "suppliers", loadChildren: () => import("./supplier/supplier.module").then(module => { return module.SupplierModule }) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
