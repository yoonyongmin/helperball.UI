import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static SessionKey = 'helperballSession';
  endPoint = 'http://localhost:8080/api.helperball/hb/v1';

  constructor(
	private message: MessageService
  ) { }

	public loadLoginSession(): any {
			const session = localStorage.getItem(LoginService.SessionKey);
			
			if (!session) {
				return null;
			} else {
				const parsedSession = JSON.parse(session);

				if (parsedSession != null && parsedSession.loggedIn) {
					return parsedSession;
				} else {
					return null;
				}
			};
		};

	saveLoginSession(session: any) {
		localStorage.setItem(LoginService.SessionKey, JSON.stringify(session));
	}

	public login(userId, password) : Observable<any> {
		const subject = new Subject<any>();
		let url = this.endPoint + '/auth/login';
		let params = new HttpParams()
			.set('userId', userId)
		.set('password', password);
	
		this.message.postResponse(url, { userId: userId, password: password } ).subscribe(res => {
			console.log(res);
			if (res && res.status < 400) {
				const user = res.body;
				const loginSession = this.loadLoginSession();

				if (!loginSession || loginSession.loginId != user.userId) {
					this.saveLoginSession({
						'loggedIn': true,
						'loginId': user.userId,
						'loginName': user.username,
						'accessKey': res.headers.get('AccessKey'),
						'secretKey': res.headers.get('SecretKey'),
						'config': (user.setting ? JSON.parse(user.setting.setting) : {})
					});
				} else {
					loginSession.loggedIn = true;
					loginSession.loginName = user.username;
					if (user.setting) {
						loginSession.config = JSON.parse(user.setting.setting);
					}
					loginSession.accessKey = res.headers.get('AccessKey');
					loginSession.secretKey = res.headers.get('SecretKey');

					this.saveLoginSession(loginSession);
				}
			}
			subject.next(res);
		}, error => {
			subject.error(error);
		});
		return subject;
	}
}
