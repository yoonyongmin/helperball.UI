import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  formGroup: FormGroup;
  idValidator = new FormControl();
  pwValidator = new FormControl('', [Validators.required]);

  error_messages = {
    'id': [
      { type: 'required', message: 'ID is required.' },
    ],

    'name': [
      { type: 'required', message: 'Name is required.' }
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private helperballService: HelperballService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id': [null, Validators.required],
      'name': [null, Validators.required],
      'password': [null, [Validators.required, Validators.minLength(8)]],
      'confirmpassword': [null, [Validators.required, Validators.minLength(8)]],
    }, {
      validators: this.passwordCheck.bind(this)
    });
  }

  passwordCheck(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
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
