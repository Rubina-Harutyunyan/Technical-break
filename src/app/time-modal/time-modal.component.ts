import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {RemindLaterComponent} from '../remind-later/remind-later.component';
import {TimerService} from '../services/timer.service';
import {publish} from 'rxjs/operators';

@Component({
  selector: 'app-time-modal',
  templateUrl: './time-modal.component.html',
  styleUrls: ['./time-modal.component.scss']
})

export class TimeModalComponent implements OnInit {
  public permit: any = true;
  constructor(
    public dialogRef: MatDialogRef<TimeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private timerService: TimerService
  ) {
  }


  ngOnInit() {

  }

  onNoClick(selection): void {

    if (selection === this.data.confirm) {
      this.timerService.setTimer();

      localStorage.setItem('permit', this.permit);
      this.dialogRef.close(selection);

    }
    this.dialogRef.close(selection);
  }

  openDialogRemindLater() {
    const dialogRef = this.dialog.open(RemindLaterComponent, {
      width: '420px',
      data: {
        text: 'Remind me again in:',
        minutes: [
          {minutes: '1m'},
          {minutes: '20m'},
          {minutes: '30m'}
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
