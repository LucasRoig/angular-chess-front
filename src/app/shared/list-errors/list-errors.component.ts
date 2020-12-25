import {Component, Input, OnInit} from '@angular/core';
import {Errors} from '../models/errors.model';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent implements OnInit {
  formattedErrors: string[] = [];

  @Input()
  set errors(errorsList: Errors) {
    this.formattedErrors = [];
    if (errorsList.errors) {
      for (const field of Object.keys(errorsList.errors)) {
        this.formattedErrors.push(`${field} ${errorsList.errors[field]}`);
      }
    }
  }

  ngOnInit(): void {
  }

}
