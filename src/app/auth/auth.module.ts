import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

const authRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
  }, {
    path: 'register',
    component: AuthComponent
  }
]);

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    authRouting,
    SharedModule
  ]
})
export class AuthModule { }
