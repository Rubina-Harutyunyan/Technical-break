import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatOption} from '@angular/material';
import {TimeModalComponent} from '../time-modal/time-modal.component';
import {Router} from '@angular/router';
import {TimerService} from '../services/timer.service';
import {AuthService} from '../services/auth.service';
import {UsersService} from '../services/users.service';
import {ignoreElements} from 'rxjs/operators';
import {JsonPipe} from '@angular/common';
import {TimerComponent} from '../timer/timer.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  public flag;
  public firstName: string;
  public lastName: string;
  public reminder = new FormGroup({
    start: new FormControl('09:00 AM'),
    end: new FormControl('09:00 PM'),
    repeat: new FormControl([1]),
    interval: new FormControl('Every 1 minutes'),
    lasts: new FormControl('5 seconds'),
    user_id: new FormControl()
  });
  public reminderInfo: any;


  public weekDays: any = [
    {
      key: 1,
      dayName: 'Monday'
    },
    {
      key: 2,
      dayName: 'Tuesday'
    },
    {
      key: 3,
      dayName: 'Wednesday'
    },
    {
      key: 4,
      dayName: 'Thursday'
    },
    {
      key: 5,
      dayName: 'Friday'
    },
    {
      key: 6,
      dayName: 'Saturday'
    },
    {
      key: 0,
      dayName: 'Sunday'
    }
  ];

  public interval: {} = [
    {period: 'Every 1 minutes'},
    {period: 'Every 20 minutes'},
    {period: 'Every 30 minutes'}
  ];

  public countDown: any;
  public duration: {} = [
    {lasts: '5 seconds'},
    {lasts: '20 seconds'},
    {lasts: '30 seconds'}
  ];

  // public date = new Date();
  // public hours = this.date.getHours();
  // public minute = this.date.getMinutes();
  public now: any;
  public userId: any;
  public seconds: any;
  public minutes: any;
  public hours: number;
  public days: any;
  public intervalRepeat: number;
  public audio: any;
  @ViewChild('weekdays', {static: false}) private weekdays: MatOption;


  constructor(public dialog: MatDialog, private router: Router, private timerService: TimerService, private authService: AuthService, private usersService: UsersService) {
    setInterval(() => {
      this.now = Date.now();
    }, 1);
  }


  ngOnInit() {

    this.timerService.timerDetails.subscribe(details => {
      console.log(details);
      this.hours = details['hours'];
      this.minutes = details['minutes'];
      this.intervalRepeat = details['interval'] / 60 / 1000;
      this.countDown = setInterval(() => {
        if (this.minutes === 0 && this.hours <= 0) {

          clearInterval(this.countDown);
          // this.minutes = this.intervalRepeat;
        } else if (this.minutes > 0 && this.minutes <= 59) {

          return this.minutes--;
        } else if (this.minutes === 0 && this.hours > 0) {
          this.minutes = 59;
          this.hours--;
        }
      }, 60000);
    });

    this.reminderInfo = JSON.parse(sessionStorage.getItem('reminderInfo'));

    this.usersService.userInfo().subscribe(res => {
      console.log('********', res);
      console.log('********', Object.keys(res['data']['settings']).length);

      this.firstName = res['data']['userInfo'].firstName;
      this.lastName = res['data']['userInfo'].lastName;
      if (Object.keys(res['data']['settings']).length > 0) {

        sessionStorage.setItem('reminderInfo', JSON.stringify(res['data']['settings']));
        this.reminder.get('start').setValue(res['data']['settings'].start);
        this.reminder.get('end').setValue(res['data']['settings'].end);
        this.reminder.get('repeat').setValue(JSON.parse(res['data']['settings'].repeat));
        this.reminder.get('interval').setValue(res['data']['settings'].interval);
        this.reminder.get('lasts').setValue(res['data']['settings'].lasts);
        const minute = res['data']['settings'].start;
        console.log(minute.split(':')[0]);
        console.log(parseInt(minute.split(':')[1]));
      }
      this.userId = res['data']['userInfo'].id;
      this.reminder.get('user_id').setValue(this.userId);

      this.timerService.setTimer();

    }, err => {
      console.log(err);
    });

    this.flag = sessionStorage.getItem('selected');

  }


  weekDaysSelection() {
    if (this.weekdays.selected) {
      this.reminder.controls.repeat
        .patchValue([...this.weekDays.map(item => item.key).filter(i => (i < 6 && i > 0)), 7]);
      this.flag = true;
      sessionStorage.setItem('selected', this.flag);
    } else {
      this.reminder.controls.repeat.patchValue([]);
      sessionStorage.removeItem('selected');
    }
  }


  reminderDetails() {
    if (sessionStorage.getItem('result')) {
      sessionStorage.removeItem('result');
    }

    if (sessionStorage.getItem('reminderInfo') !== null && Object.keys(JSON.parse(sessionStorage.getItem('reminderInfo'))).length > 0) {

      this.usersService.updateReminder(this.reminder.value).subscribe(res => {

        sessionStorage.setItem('reminderInfo', JSON.stringify(this.reminder.value));
        localStorage.setItem('permit', 'permit');

        this.timerService.setTimer();
      }, err => {
        console.log(err);
      });
    } else {

      this.usersService.setReminder(this.reminder.value).subscribe(res => {
        console.log('reminder', this.reminder.value);
        console.log('res', res);
        sessionStorage.setItem('reminderInfo', JSON.stringify(this.reminder.value));
        localStorage.setItem('permit', 'permit');

        this.timerService.setTimer();
      }, err => {
        console.log(err);
      });
    }

  }

  openDialogTimerSetModal() {
    this.audio = new Audio();
    this.audio.src = './assets/start.mp3';
    this.audio.load();
    this.audio.play();
    const timerSet = this.dialog.open(TimerComponent, {
      width: '372px',
      data: {
        text: 'Timer set!',
        confirm: 'Ok'
      }
    });

    timerSet.afterClosed().subscribe(result => {
      console.log(result);
      console.log('reminder after closed', this.reminder.value);
    });
    setTimeout(() => {
      timerSet.close();
    }, 2000);

  }


  openDialogTimeModal() {

    if (sessionStorage.getItem('result')) {
      sessionStorage.removeItem('result');
    }

    if (sessionStorage.getItem('reminderInfo').length) {

      this.usersService.updateReminder(this.reminder.value).subscribe(res => {
        console.log('reminder', this.reminder.value);
        console.log('if res', res);
        sessionStorage.setItem('reminderInfo', JSON.stringify(this.reminder.value));

      }, err => {
        console.log(err);
      });
    } else {

      this.usersService.setReminder(this.reminder.value).subscribe(res => {
        console.log('reminder', this.reminder.value);
        console.log('res', res);
        sessionStorage.setItem('reminderInfo', JSON.stringify(this.reminder.value));

      }, err => {
        console.log(err);
      });
    }


    const dialogRef = this.dialog.open(TimeModalComponent, {
      width: '372px',
      data: {
        text: 'Time for a break?',
        confirm: 'Yes!',
        cancel: 'No!'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('reminder after closed', this.reminder.value);
    });

  }

  logOut() {
    sessionStorage.removeItem('reminderInfo');
    this.authService.logOut();
  }

}
