import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HelperballService {

  endPoint = "http://localhost:8080/api.helperball/hb/v1";

  constructor(
    private http : HttpClient,
  ) { }

  getDefaultHeaders(contentType?: string): HttpHeaders {
		if (localStorage.getItem('helperballSession')) {
			const session = JSON.parse(localStorage.getItem('helperballSession'));

			if(localStorage.getItem('locale')) {
				return new HttpHeaders({
					'Content-Type': (contentType ? contentType : 'application/json'),
					'LoginId': session.loginId,
					'AccessKey': session.accessKey,
					'SecretKey': session.secretKey,
					'Accept-Language' : localStorage.getItem('locale')
				});
			}
			else {
				return new HttpHeaders({
					'Content-Type': (contentType ? contentType : 'application/json'),
					'LoginId': session.loginId,
					'AccessKey': session.accessKey,
					'SecretKey': session.secretKey
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
}
