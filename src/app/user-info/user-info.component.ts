import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HelperballService } from '../service/helperball/helperball.service';
import { SocialAuthService } from 'angularx-social-login';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  users: any = [];
  stats: any = [];
  infos: any = [];
  foots: any = ['오른발', '왼발', '양발'];
  positions: any = ['CF', 'SS', 'LW', 'RW', 'AM', 'CM', 'DM', 'CB', 'LB', 'RB', 'GK'];

  body: any = [];
  
  weight: any;
  height: any;
  foot: any;
  position: any;
  age: any;

  constructor(
    private helperballService: HelperballService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
  }

  getUserList() {
    this.helperballService.getUserList().subscribe(res => {
      this.users = res;
    })
  }

  addAge(type: any, event: MatDatepickerInputEvent<Date>) {
    this.age = event.value.getFullYear()+"-"+event.value.getMonth()+"-"+event.value.getDate();
    console.log(this.age);
  }

  saveInfo() {
    this.helperballService.saveInfo(this.weight, this.height, this.foot, this.position, this.age).subscribe(res => {
      alert('저장 완료!');
      this.router.navigate(['/dashboard']);
    })
  }

  skipInfo() {
    this.router.navigate(['/dashboard']);
  }

}
