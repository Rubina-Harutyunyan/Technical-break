import {Component, OnInit} from '@angular/core';
import {TimerService} from './services/timer.service';
import {passBoolean} from 'protractor/built/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public result: any;

  constructor(
    private timerService: TimerService
  ) {
  }

  ngOnInit() {
    // this.timerService.setReminder();
  }
}

