import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public user: FormGroup;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    this.usersService.login(this.user.value).subscribe(res => {
      console.log(res);
      this.usersService.setToken(res['data'].token);
      this.router.navigate(['/reminder']);
    }, err => {
      console.log(err);
    });

  }


}
