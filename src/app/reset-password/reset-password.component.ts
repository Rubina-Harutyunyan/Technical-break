import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public user: FormGroup;
  public passwordsMatch: boolean = false;
  public token: string;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    this.user = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      token: new FormControl(this.token)
    });
  }

  reset() {
    if (this.user.get('password').value === this.user.get('confirmPassword').value) {
      this.usersService.resetPassword({
        password: this.user.get('password').value,
        confirmPassword: this.user.get('confirmPassword').value,
        token: this.token
      }).subscribe(res => {
        console.log(res);
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
      });
    } else {
      return this.passwordsMatch = true;
    }


  }

}
