import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecievingListComponent } from './components/recieving-list/recieving-list.component';
import { RecievingViewComponent } from './components/recieving-view/recieving-view.component';
import { RecievingAddEditComponent } from './components/recieving-add-edit/recieving-add-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RecievingItemAddRditComponent } from './components/recieving-item-add-rdit/recieving-item-add-rdit.component';

const routes: Routes = [
  { path: "", component: RecievingListComponent },
  { path: "add", component: RecievingAddEditComponent },
  { path: ":id/edit", component: RecievingAddEditComponent },
  { path: ":id/view", component: RecievingViewComponent }
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
    RecievingItemAddRditComponent
  ]
})
export class RecievingModule { }
