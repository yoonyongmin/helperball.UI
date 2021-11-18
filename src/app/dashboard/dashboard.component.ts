import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HelperballService } from '../service/helperball/helperball.service';
import { SocialAuthService } from 'angularx-social-login';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './coolTheme';
import { LoginService } from '../service/login/login.service';


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
          { value: '', name: 'Goal' },
          { value: '', name: 'Shoot' },
          { value: '', name: 'Assist' },
          { value: '', name: 'Pass' },
          { value: '', name: 'Tackle' },
          { value: '', name: 'Intercept' },
        ]
      }
    ]
  };

  login: any;
  loginId: any;

  constructor(
    private helperballService: HelperballService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.login = this.loginService.loadLoginSession();
    this.loginId = this.login.loginId;

    this.doRefresh();
  }

  doRefresh() {
    this.getUser();
  }

  getUser() {
    console.log('gg');
    this.helperballService.getUserAuthentication(this.loginId).subscribe(res => {
      if (res != null) {
        console.log(res);
        const stats = res.stat;
        
        this.options.series[0].data[0].value = stats[0].goal;
        this.options.series[0].data[1].value = stats[0].shoot;
        this.options.series[0].data[2].value = stats[0].assist;
        this.options.series[0].data[3].value = stats[0].pass;
        this.options.series[0].data[4].value = stats[0].tackle;
        this.options.series[0].data[5].value = stats[0].intercept;
      }
    })
  }

  // getUserList() {
  //   this.helperballService.getUserList().subscribe(res => {
  //     this.users = res;
  //     console.log(res);
  //     this.stats = res
  //   })
  // }

  // getStatList() {
  //   this.helperballService.getStatList().subscribe(res => {
  //     this.stats = res;
  //   });
  // }

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
