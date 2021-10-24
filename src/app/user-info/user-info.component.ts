import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HelperballService } from '../service/helperball.service';
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
  positions: any = [];
  foots: any = [];

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

  public getUserList() {
    this.helperballService.getUserList().subscribe(res => {
      this.users = res;
    })
  }

  public getStatList() {
    this.helperballService.getStatList().subscribe(res => {
      this.stats = res;
    });
  }

  public getInfoList() {
    this.helperballService.getInfoList().subscribe(res => {
      this.infos = res;
      console.log(res);
    })
  }

  public getPositionList() {
    this.helperballService.getPositionList().subscribe(res => {
      this.positions = res;
    });
  }

  public getFootList() {
    this.helperballService.getFootList().subscribe(res => {
      this.foots = res;
      console.log(res);
    })
  }

  public addAge(type: any, event: MatDatepickerInputEvent<Date>) {
    this.age = event.value.getFullYear()+"-"+event.value.getMonth()+"-"+event.value.getDate();
    console.log(this.age);
  }

  public saveInfo() {
    this.helperballService.saveInfo(this.weight, this.height, this.foot, this.position).subscribe(res => {

    })
  }

}
