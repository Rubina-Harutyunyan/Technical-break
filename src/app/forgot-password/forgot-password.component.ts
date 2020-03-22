import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public user: FormGroup;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

  }

  resetPassword() {
    this.usersService.resetPassEmail(this.user.value).subscribe(res => {
      this.toastr.success('Please check your email!');
      this.user.reset();
      console.log(res);
    }, err => {
      this.toastr.error('User not found!');
      console.log(err);
    });
    console.log(this.user);
  }

}
