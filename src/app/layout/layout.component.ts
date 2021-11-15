import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { HelperballService } from '../service/helperball/helperball.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;  

  constructor(
    private helperballService: HelperballService, 
    private router: Router,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }
  
  logOut(): void {
    this.socialAuthService.signOut().then(res => {
      console.log('로그아웃');
      this.router.navigate(['/main']);
    });
    // this.socialAuthService.authState.subscribe((res) => {
    // });
  }
}
