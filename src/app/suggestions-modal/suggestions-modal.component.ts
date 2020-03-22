import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-suggestions-modal',
  templateUrl: './suggestions-modal.component.html',
  styleUrls: ['./suggestions-modal.component.scss']
})
export class SuggestionsModalComponent implements OnInit {
  public selectedOption;

  constructor(
    public dialogRef: MatDialogRef<SuggestionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private router: Router
  ) {
  }


  ngOnInit() {
  }

  getValue(option) {
    this.selectedOption = option;
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['reminder']);

  }

}
