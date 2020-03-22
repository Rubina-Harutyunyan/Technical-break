import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {ReminderComponent} from './reminder/reminder.component';
import {AuthGuard} from './services/auth.guard';
import {LoginGuard} from './services/login.guard';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {CheckTokenGuard} from './services/check-token.guard';


const routes: Routes = [
  {path: 'reminder', canActivate: [AuthGuard], component: ReminderComponent},
  {path: 'login', canActivate: [LoginGuard],  component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'resetPasswordresetPassword', canActivate: [CheckTokenGuard], component: ResetPasswordComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
