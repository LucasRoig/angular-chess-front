import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthType, UserService} from '../shared/services/user.service';
import {Errors} from '../shared/models/errors.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title = '';
  authForm: FormGroup;
  isSubmitting = false;
  authTypeEnum = AuthType;
  authType: AuthType = AuthType.Login;
  errors: Errors = new Errors();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const path = url[url.length - 1].path;
      if (path === 'login') {
        this.title = 'Sign In';
        this.authType = AuthType.Login;
      } else {
        this.authType = AuthType.Register;
        this.title = 'Sign Up';
        this.authForm.addControl('username', new FormControl('', Validators.required));
        console.log(this.authForm.get('email'));
      }
    });
  }

  submitForm(): void {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        console.log(err.error.errors);
        this.errors = err.error.errors;
        this.isSubmitting = false;
      }
    );
  }
}
