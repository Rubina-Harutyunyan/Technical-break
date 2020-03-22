import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TimerService} from '../services/timer.service';

@Component({
  selector: 'app-remind-later',
  templateUrl: './remind-later.component.html',
  styleUrls: ['./remind-later.component.scss']
})
export class RemindLaterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemindLaterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private timer: TimerService
  ) {
  }

  onNoClick(minute): void {
    // this.timer.remindLater(minute);
    this.dialogRef.close(minute);
  }

  ngOnInit() {
    console.log(this.data.minutes);
  }

}
