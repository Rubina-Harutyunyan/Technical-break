import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  public user: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.user = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\S]\\D*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\\S]\\D*')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  register() {

    this.usersService.register(this.user.value).subscribe(res => {
      console.log(res);
      this.usersService.setToken(res['data'].token);
      this.router.navigate(['/reminder']);
    }, err => {
      console.log(err);
    });
    console.log(this.user.value);
  }

}
