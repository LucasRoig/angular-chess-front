import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterModule} from '@angular/router';

const homeRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
  }
]);


@NgModule({
  declarations: [HomeComponent],
  imports: [
    homeRouting,
    CommonModule
  ]
})
export class HomeModule { }
