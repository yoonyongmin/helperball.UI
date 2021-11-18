import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  protected onEnd(ignoreLoader?: boolean) {
		if (!ignoreLoader) {
			// this.loaderService.hide();
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
			// return ((this.isJson(params) && (!contentType || contentType === 'application/json')) ? params : params);
		}
	}

	getDefaultHeaders(contentType?: string): HttpHeaders {
		if (localStorage.getItem(LoginService.SessionKey)) {
			const session = JSON.parse(localStorage.getItem('helperballSession'));

			return new HttpHeaders({
				'Content-Type': (contentType ? contentType : 'application/json'),
				'LoginId': session.loginId,
				'AccessKey': session.accessKey,
				'SecretKey': session.secretKey,
				'Accept-Language' : localStorage.getItem('locale')
			});

			// if(localStorage.getItem('locale')) {
			// 	return new HttpHeaders({
			// 		'Content-Type': (contentType ? contentType : 'application/json'),
			// 		'LoginId': session.loginId,
			// 		'AccessKey': session.accessKey,
			// 		'SecretKey': session.secretKey,
			// 		'Accept-Language' : localStorage.getItem('locale')
			// 	});
			// }
			// else {
			// 	return new HttpHeaders({
			// 		'Content-Type': (contentType ? contentType : 'application/json'),
			// 		'LoginId': session.loginId,
			// 		'AccessKey': session.accessKey,
			// 		'SecretKey': session.secretKey
			// 	});
			// }
		}
	}

	protected getHttpOptions(requestData: any, contentType?: string, responseType?: string, ignoreLoader?: boolean): any {
		// this.onBegin(ignoreLoader);

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

  postResponse(requestUrl: string, body?: any, params?: any, contentType?: string, handleNoError?: boolean): Observable<HttpResponse<any>> {
		return this.http.post<any>(requestUrl, body, {
			headers: this.getDefaultHeaders(contentType),
			params: this.getData('post', params, contentType),
			observe: 'response'})
			.pipe(tap(_ => this.log('fetched post data'), this.handleError<any>('MessageService::postResponse', {}, handleNoError), () => this.onEnd()));
	}

  private handleError<T>(operation = 'operation', result?: T, handleNoError?: boolean) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			if (error.status !== 417 && error.status !== 403) {
				if (!error.message.includes(environment)) {
					if (!handleNoError) {
						// this.alertService.error(error.message);
					}
				}	
			}
			this.onEnd();
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a HeroService message with the NotificationService */
	private log(message: string) {
		//console.log(message);
	}

}
