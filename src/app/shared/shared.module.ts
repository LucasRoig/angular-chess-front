import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListErrorsComponent } from './list-errors/list-errors.component';



@NgModule({
  declarations: [HeaderComponent, ListErrorsComponent],
  exports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    ListErrorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
