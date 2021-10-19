import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userId: any = '';
  userPw: any = '';
  userEmail: any = '';

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) { }

  ngOnInit(): void {
  }

}
