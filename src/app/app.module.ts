import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReminderComponent } from './reminder/reminder.component';
import { TimeModalComponent } from './time-modal/time-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { RemindLaterComponent } from './remind-later/remind-later.component';
import {HttpClientModule} from '@angular/common/http';
import { SuggestionsModalComponent } from './suggestions-modal/suggestions-modal.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ToastrModule} from 'ngx-toastr';
import { TimerComponent } from './timer/timer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReminderComponent,
    TimeModalComponent,
    RemindLaterComponent,
    SuggestionsModalComponent,
    RegistrationPageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [
    TimeModalComponent,
    RemindLaterComponent,
    SuggestionsModalComponent,
    TimerComponent
  ],
  providers: [ReminderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
