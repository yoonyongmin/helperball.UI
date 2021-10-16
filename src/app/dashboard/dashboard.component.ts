import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HelperballService } from '../service/helperball.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = [];
  stat: any = [];

  constructor(private helperballService : HelperballService) { }

  ngOnInit() {
    this.getUserList();
    this.getStatList();
  }

  public getUserList() {
    this.helperballService.getUserList().subscribe(res => {
      this.user = res;
      console.log(res);
    })
  }

  public getStatList() {
    this.helperballService.getStatList().subscribe(res => {
      this.stat = res;
      console.log(res);
    });
  }

}
