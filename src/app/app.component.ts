import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit{
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.populate();
  }
}
