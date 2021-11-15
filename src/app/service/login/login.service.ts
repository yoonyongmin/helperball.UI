import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static SessionKey = 'helperballSession';

  constructor() { }

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

}
