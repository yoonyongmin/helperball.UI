import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { MatchComponent } from './match/match.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'info', component: UserInfoComponent},
  {path: 'layout', component: LayoutComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'match', component: MatchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
