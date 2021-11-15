import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HelperballService } from '../service/helperball/helperball.service';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  id: string;
  name: string;
  email: string;

  loginId: string;
  loginPw: string;

  constructor(
    private helperballService: HelperballService, 
    private router: Router,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
  ) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.helperballService.sendMail("dydals361@gmail.com", "윤용민", "qwer1234");
    }
    
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = (user != null);

        if (user != null) {
          this.id = user.id;
          this.name = user.name;
          this.email = user.email;

          this.helperballService.getUserAuthentication(this.email).subscribe(res => {
            if (res === null) {
              this.helperballService.oauthUserAuthentication(this.id, this.name, this.email).subscribe(res => {
                console.log(res);
                console.log('로그인 정보 저장');
                this.router.navigate(['/info']);
              })
            } else {
              console.log('로그인');
              this.router.navigate(['/info']);
            }
          })

        }

      })
    }
    
    loginWithFacebook(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    login() {
      this.helperballService.login(this.loginId, this.loginPw).subscribe(res => {
        this.router.navigate(['/dashboard']);
      })
    }

    signUp() {
      this.router.navigate(['/signUp']);
    }

    sendMail() {
      this.helperballService.sendMail("dydals361@gmail.com", "윤용민", "qwer1234");
    }

}
