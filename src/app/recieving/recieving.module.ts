import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecievingListComponent } from './components/recieving-list/recieving-list.component';
import { RecievingViewComponent } from './components/recieving-view/recieving-view.component';
import { RecievingAddEditComponent } from './components/recieving-add-edit/recieving-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RecievingItemAddRditComponent } from './components/recieving-item-add-rdit/recieving-item-add-rdit.component';
import { LoginGuardService } from '../auth/services/login-guard.service';
import { StringToDatePipe } from '../string-to-date.pipe';

const routes: Routes = [
  { path: "", component: RecievingListComponent, canActivate:[LoginGuardService] },
  { path: "add", component: RecievingAddEditComponent, canActivate:[LoginGuardService] },
  { path: ":id/edit", component: RecievingAddEditComponent, canActivate:[LoginGuardService] },
  { path: ":id/view", component: RecievingViewComponent, canActivate:[LoginGuardService] }
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
    RecievingListComponent,
    RecievingViewComponent,
    RecievingAddEditComponent,
    RecievingItemAddRditComponent,
    StringToDatePipe
  ]
})
export class RecievingModule { }
