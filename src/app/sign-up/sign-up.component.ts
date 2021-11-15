import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { HelperballService } from '../service/helperball/helperball.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userId: any = '';
  userName: any = '';
  userPw: any = '';
  userPwCheck: any = '';
  userEmail: any = '';

  userIdAuthentication: boolean = false;

  idValidator = new FormControl();
  pwValidator = new FormControl();

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private helperballService: HelperballService
  ) { }

  ngOnInit(): void {
  }

  userIdDoubleCheck() {
    this.helperballService.getUserAuthentication(this.userId).subscribe(res => {
      if (res == null) {
        this.userIdAuthentication = true;
        alert("사용할 수 있는 아이디 입니다.")
      } else {
        this.userIdAuthentication = false;
        alert("이미 사용하고 있는 아이디 입니다. 다른 아이디를 입력하세요.")
      }
    })
  }

  signUp() {
    this.helperballService.signUp(this.userId, this.userName, this.userPw).subscribe(res => {
      this.router.navigate(['/info']);
    })
  }

}
