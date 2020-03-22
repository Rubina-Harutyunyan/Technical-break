import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';
import {TimeModalComponent} from '../time-modal/time-modal.component';
import {SuggestionsModalComponent} from '../suggestions-modal/suggestions-modal.component';
import {MatDialog} from '@angular/material';
import {logging} from 'selenium-webdriver';
import {toArray} from 'rxjs/operators';
import {ReminderComponent} from '../reminder/reminder.component';


@Injectable({
  providedIn: 'root'
})


export class TimerService {

  private data = new BehaviorSubject(false);
  permission = this.data.asObservable();

  private reminderData = new BehaviorSubject({});
  reminder = this.reminderData.asObservable();

  private reminderDetails = new BehaviorSubject({});
  timerDetails = this.reminderDetails.asObservable();

  public date = new Date();
  public currentTime = moment().format('LT');
  public currentDay = this.date.getDay();
  public dayInMilliseconds: number = 86400000;
  public start: number;
  public end: any;
  public repeatDay: number;
  public interval: number;
  public lasts: number;
  public intervalSet: any;
  public reminderInfo: any;
  public later: number;
  public result: any;
  public permit: any;
  public token: string;
  public timeout: any;
  public allow: boolean;
  public audio: any;

  public seconds: any;
  public minutes: any;
  public hours: any;
  public days: any;
  public timerMinutes: any;
  public timerHours;

  constructor(
    private dialog: MatDialog,
  ) {
  }

  // permit(start) {0
  //   this.data.next(start);
  //   this.permitStart = start;
  //   console.log(start);
  // }

  setTimer() {


    if (typeof this.timeout !== 'undefined') {
      clearTimeout(this.timeout);
      clearInterval(this.intervalSet);
    }

    if (localStorage.getItem('token')) {
      this.reminderInfo = JSON.parse(sessionStorage.getItem('reminderInfo'));
      this.permit = localStorage.getItem('permit');

      if (this.reminderInfo) {
        this.interval = parseInt(this.reminderInfo.interval.match(/(\d+)/)) * 60 * 1000;

        this.lasts = parseInt(this.reminderInfo.lasts.match(/(\d+)/)) * 1000;


        let repeat = this.reminderInfo.repeat;

        if (typeof this.reminderInfo.repeat === 'string') {

          repeat = JSON.parse(this.reminderInfo.repeat);

        }


        this.repeatDay = repeat.find(day => day === this.currentDay);
        if (this.repeatDay) {
          if (moment(this.currentTime, 'HH:mm:ss a') > moment(this.reminderInfo.start, 'HH:mm:ss a')) {

            this.start = (7 * this.dayInMilliseconds) - Math.abs(moment.duration(moment(this.currentTime, 'HH:mm:ss a').diff(moment(this.reminderInfo.start, 'HH:mm:ss a')))['_milliseconds']);
          } else {
            this.start = Math.abs(moment.duration(moment(this.currentTime, 'HH:mm:ss a').diff(moment(this.reminderInfo.start, 'HH:mm:ss a')))['_milliseconds']);

          }
        }

        // if (moment(this.currentTime, 'HH:mm:ss a') > moment(this.reminderInfo.start, 'HH:mm:ss a')) {
        //   // const zzz = this.repeatDay - this.currentDay;
        //   this.start = this.dayInMilliseconds - Math.abs(moment.duration(moment(this.currentTime, 'HH:mm:ss a').diff(moment(this.reminderInfo.start, 'HH:mm:ss a')))['_milliseconds']);
        // } else {
        //   this.start = Math.abs(moment.duration(moment(this.currentTime, 'HH:mm:ss a').diff(moment(this.reminderInfo.start, 'HH:mm:ss a')))['_milliseconds']);
        //
        // }

        console.log('////////', this.start);

        console.log(this.timeConversion(this.start));

      }


      this.result = sessionStorage.getItem('result');
      if (this.currentDay === this.repeatDay && moment(new Date(), 'HH:mm:ss a') > moment(this.reminderInfo.end, 'HH:mm:ss a') && this.result) {
        sessionStorage.removeItem('result');
      } else if (this.currentDay === this.repeatDay && this.result === null && localStorage.getItem('token') !== null) {

        this.timeout = setTimeout(() => {


          if (moment(new Date(), 'HH:mm:ss a') >= moment(this.reminderInfo.start, 'HH:mm:ss a') && moment(new Date(), 'HH:mm:ss a') < moment(this.reminderInfo.end, 'HH:mm:ss a') && this.permit !== null) {

            console.log('///', moment(new Date(), 'HH:mm:ss a'));
            this.allow = true;
            this.playAudio();

            const dialogRef = this.dialog.open(SuggestionsModalComponent, {
              width: '450px',
              data: {
                text: 'Try some of these activities!',
                options: [
                  {option: 'Take a stroll'},
                  {option: 'Drink water'},
                  {option: 'Stretch'},
                  {option: 'Close your eyes'}
                ]
              }
            });

            setTimeout(() => {
              dialogRef.close();
            }, this.lasts);
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                sessionStorage.setItem('result', JSON.stringify(result));
                this.audio.pause();
                this.audio.currentTime = 0;
                clearInterval(this.intervalSet);
              }
            });
            localStorage.removeItem('permit');
          }


          this.intervalSet = setInterval(() => {


            if (moment(new Date(), 'HH:mm:ss a') >= moment(this.reminderInfo.start, 'HH:mm:ss a') && moment(new Date(), 'HH:mm:ss a') < moment(this.reminderInfo.end, 'HH:mm:ss a') && localStorage.getItem('token') !== null) {
              console.log('*******', moment(new Date(), 'HH:mm:ss a'));
              this.playAudio();
              const dialogRef = this.dialog.open(SuggestionsModalComponent, {
                width: '450px',
                data: {
                  text: 'Try some of these activities!',
                  options: [
                    {option: 'Take a stroll'},
                    {option: 'Drink water'},
                    {option: 'Stretch'},
                    {option: 'Close your eyes'}
                  ]
                }
              });
              setTimeout(() => {
                dialogRef.close();
              }, this.lasts);
              dialogRef.afterClosed().subscribe(result => {
                if (result) {
                  sessionStorage.setItem('result', JSON.stringify(result));
                  clearInterval(this.intervalSet);
                }
              });
            } else if (moment(new Date(), 'HH:mm:ss a') > moment(this.reminderInfo.end, 'HH:mm:ss a')) {
              // this.audio.currentTime = 0;
              clearInterval(this.intervalSet);
            }

          }, this.interval);

        }, 1000);
      }
    }
  }


  timeConversion(millisec) {

    this.seconds = (millisec / 1000).toFixed(1);

    this.minutes = Math.floor((millisec / (1000 * 60)));

    this.hours = Math.floor((millisec / (1000 * 60 * 60)) % 24);

    this.days = Math.floor((millisec / (1000 * 60 * 60 * 24)));

    if (this.seconds < 60) {
      return this.seconds + ' Sec';
    } else if (this.minutes < 60) {
      this.minutes = (this.minutes < 10) ? '0' + this.minutes : this.minutes;
      this.reminderDetails.next({hours: '00', minutes: this.minutes, interval: this.interval});
      return this.minutes + ' Min';
    } else if (this.minutes > 60 && this.hours < 24) {
      this.timerHours = this.hours * 60;
      this.timerMinutes = this.minutes - this.timerHours;

      this.hours = (this.hours < 10) ? '0' + this.hours : this.hours;
      this.timerMinutes = (this.timerMinutes < 10) ? '0' + this.timerMinutes : this.timerMinutes;
      this.reminderDetails.next({hours: this.hours, minutes: this.timerMinutes, interval: this.interval});
      return this.hours + ':' + this.timerMinutes;
    } else {
      return this.days + ' Days';
    }

  }

  playAudio() {
    this.audio = new Audio();
    this.audio.src = './assets/alarm.mp3';
    this.audio.load();
    this.audio.play();
    this.audio.muted = false;
  }


}


// remindLater(minute) {
//   this.later = parseInt(minute.match(/(\d+)/)) * 60 * 1000;
//
//   setTimeout(() => {
//     const dialogRef = this.dialog.open(TimeModalComponent, {
//       width: '372px',
//       data: {
//         text: 'Time for a break?',
//         confirm: 'Yes!',
//         cancel: 'No!'
//       }
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//     });
//   }, this.later);
//   clearTimeout();
// }
