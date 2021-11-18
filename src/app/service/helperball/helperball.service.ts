import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../message.service';


@Injectable({
  providedIn: 'root'
})
export class HelperballService {

  endPoint = 'http://localhost:8080/api.helperball/hb/v1';
  session;

  constructor(
    private http : HttpClient,
	private message: MessageService
  ) { }

//   retrieveToken(code) {
//     let params = new URLSearchParams();   
//     params.append('grant_type','authorization_code');
//     params.append('client_id', this.clientId);
//     params.append('client_secret', 'newClientSecret');
//     params.append('redirect_uri', this.redirectUri);
//     params.append('code',code);

//     let headers = 
//       new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
       
//       this.http.post('http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/token', 
//         params.toString(), { headers: headers })
//         .subscribe(
//           data => this.saveToken(data),
//           err => alert('Invalid Credentials')); 
//   }

//   saveToken(token) {
//     var expireDate = new Date().getTime() + (1000 * token.expires_in);
//     this.Cookie.set("access_token", token.access_token);
//     console.log('Obtained Access token');
//     window.location.href = 'http://localhost:8089';
//   }

//   getResource(resourceUrl) : Observable<any> {
//     var headers = new HttpHeaders({
//       'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
//       'Authorization': 'Bearer '+this.Cookie.get('access_token')});
//     return this.http.get(resourceUrl, { headers: headers })
//                    .pipe((error:any) => Observable.throw(error.json().error || 'Server error'));
//   }

//   checkCredentials() {
//     return this.Cookie.check('access_token');
//   }

//   logout() {
//     this.Cookie.delete('access_token');
//     window.location.reload();
//   }

//   login() : Observable<any> {
// 	  let url = this.endPoint + '/login';
// 	  return this.query(url);
//   }


  getDefaultHeaders(contentType?: string): HttpHeaders {
		if (localStorage.getItem('helperballSession')) {
			this.session = JSON.parse(localStorage.getItem('helperballSession'));

			if(localStorage.getItem('locale')) {
				return new HttpHeaders({
					'Content-Type': (contentType ? contentType : 'application/json'),
					'LoginId': this.session.loginId,
					'AccessKey': this.session.accessKey,
					'SecretKey': this.session.secretKey,
					'Accept-Language' : localStorage.getItem('locale')
				});
			}
			else {
				return new HttpHeaders({
					'Content-Type': (contentType ? contentType : 'application/json'),
					'LoginId': this.session.loginId,
					'AccessKey': this.session.accessKey,
					'SecretKey': this.session.secretKey
				});
			}
		}
	}
  
  protected getHttpOptions(requestData: any, contentType?: string, responseType?: string): any {
		if (!responseType) {
			return {
				headers: this.getDefaultHeaders(contentType),
				params: requestData,
			};
		} else {
			return {
				headers: this.getDefaultHeaders(contentType),
				params: requestData,
				responseType: responseType
			};
		}
	}

  protected getData(method?: string, params?: any, contentType?: string): any {
		if (method && (method === 'get' || method === 'query')) {
			if (params) {
				if (contentType === 'application/json') {
					if (this.isJson(params)) {
						return escape(JSON.stringify(params));
					} else {
						return params;
					}
				} else {
					return params;
				}
			} else {
				return null;
			}
		} else {
			return params;
		}
	}
  
  protected isJson(item?: any): boolean {
		if (item && typeof item === 'object') {
			return true;
		}

		try {
			JSON.parse(item);
		} catch (e) {
			return false;
		}

		return true;
	}

  query(url : string, params? : any, responseType? : any) {
    return this.http.get<any>(url, this.getHttpOptions(this.getData('get', params), null, responseType)).pipe(map(res => res));
  }
  
  put(url : string, body? : any, params? : any) {
    return this.http.put<any>(url, body, this.getHttpOptions(this.getData('put', params))).pipe(map(res => res));
  }
  
  post(url: string, body? : any, params? : any) {
    return this.http.post<any>(url, body, this.getHttpOptions(this.getData('post', params))).pipe(map(res => res));
  }
  
  delete(url : string, params : any) {
    return this.http.delete<any>(url, this.getHttpOptions(this.getData('delete',params))).pipe(map(res => res));
  }

  public getUserList() : Observable<any> {
    let url = this.endPoint + '/user';
    return this.query(url);
  }

  public getStatList() : Observable<any> {
    let url = this.endPoint + '/stat';
    return this.query(url);
  }

  public getUserAuthentication(userId) : Observable<any> {
	  let url = this.endPoint + '/user/authentication';
	  let params = new HttpParams()
	  	.set('userId', userId);
	  return this.post(url, null, params);
  }
  
  public signUp(userId, name, password) : Observable<any> {
	  console.log(userId, name, password)
	let url = this.endPoint + '/user';
	let params = new HttpParams()
		.set('userId', userId)
		.set('name', name)
		.set('password', password);
	return this.post(url, null, params);
  }

  public login(userId, password) : Observable<any> {
	  const subject = new Subject<any>();
	  let url = this.endPoint + '/auth/login';
	  let params = new HttpParams()
	  	.set('userId', userId)
		.set('password', password);
	
	this.message.postResponse(url, { userId: userId, password: password } ).subscribe(res => {
		console.log(res);
	})
	return subject;
  }

  public saveInfo(weight, height, foot, position, age) : Observable<any> {
	  let url = this.endPoint + '/info';
	  let body = {
		  weight: weight,
		  height: height,
		  foot: foot,
		  position: position,
		  age: age,
	  }
	  let params = new HttpParams().set('userId', 'yoonyongmin');
	  return this.post(url, body, params);
  }

  public updateInfo(info) : Observable<any> {
	  let url = this.endPoint + '/info';
	  let body = info;
	  return this.put(url, body);
  }

  public sendMail(userId, name, certification) : Observable<any> {
	  let url = this.endPoint + '/mail';
	  let params = new HttpParams()
		.set('email', userId)
		.set('name', name)
		.set('certification', certification);
	  return this.post(url, null, params);
  }

  public oauthUserAuthentication(token, name, email) : Observable<any> {
	let url = this.endPoint + '/user/oauth';
	let body = {
		token: token,
		name: name,
		email: email
	};
	return this.post(url, body);
  }

}
