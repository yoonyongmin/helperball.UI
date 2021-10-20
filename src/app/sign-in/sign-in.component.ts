import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HelperballService } from '../service/helperball.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  token;
  name;
  email;

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
    }
    
    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = (user != null);

        if (user != null) {
          this.token = user.id;
          this.name = user.name;
          this.email = user.email;

          this.helperballService.saveUser(this.token, this.name, this.email).subscribe(res => {
            console.log(res);
            console.log('로그인 정보 저장');
            this.router.navigate(['/dashboard']);
          })
        }

      })
    }
    
    loginWithFacebook(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

}
