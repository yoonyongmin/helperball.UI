import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HelperballService } from '../service/helperball.service';
import { SocialAuthService } from 'angularx-social-login';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './coolTheme';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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

  theme: string | ThemeOption;
  coolTheme = CoolTheme;
  options = {
    title: {
      text: '내 스탯',
      subtext: '전체 기록',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['Goal', 'Shoot', 'Assist', 'Pass', 'Tackle', 'Intercept']
    },
    calculable: true,
    series: [
      {
        name: 'area',
        type: 'pie',
        radius: [30, 110],
        roseType: 'area',
        data: [
          { value: 10, name: 'Goal' },
          { value: 5, name: 'Shoot' },
          { value: 15, name: 'Assist' },
          { value: 25, name: 'Pass' },
          { value: 20, name: 'Tackle' },
          { value: 35, name: 'Intercept' },
        ]
      }
    ]
  };

  constructor(
    private helperballService: HelperballService,
    private router: Router,
    private socialAuthService: SocialAuthService,) { }

  ngOnInit() {
    this.getUserList();
    this.getStatList();
  }

  getUserList() {
    this.helperballService.getUserList().subscribe(res => {
      this.users = res;
      console.log(res);
    })
  }

  getStatList() {
    this.helperballService.getStatList().subscribe(res => {
      this.stats = res;
    });
  }

  addAge(type: any, event: MatDatepickerInputEvent<Date>) {
    this.age = event.value.getFullYear()+"-"+event.value.getMonth()+"-"+event.value.getDate();
    console.log(this.age);
  }

  saveInfo() {
    this.helperballService.saveInfo(this.weight, this.height, this.foot, this.position, this.age).subscribe(res => {

    })
  }

  goMatch() {
    this.router.navigate(['/match']);
  }

}
