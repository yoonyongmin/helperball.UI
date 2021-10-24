import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from './material/material.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { LayoutComponent } from './layout/layout.component';
import { UserInfoComponent } from './user-info/user-info.component';


const googleLoginOptions = {
  scope: 'profile'
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignUpComponent,
    SignInComponent,
    LayoutComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('895127368544-bcgbe8btptm1qsqv0lqltr0oo4mhj78p.apps.googleusercontent.com')
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('270953304909699')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
