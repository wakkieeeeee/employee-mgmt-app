import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  // I created this service referring to the URL below
  // https://qiita.com/ksh-fthr/items/840ae54472892a87f48d

  // private host: string = 'http://localhost:4203/app'
  private host: string = 'http://localhost:3000'


  constructor(
    private http: HttpClient
  ) { }

  public get(): Promise<any[]> {
    // return this.http.get(this.host + '/get', this.httpOptions)
    return this.http.get(this.host + '/api/v1/message')
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  //
  public articleGet(): Promise<any[]> {
    return this.http.get(this.host + '/api/v1/article')
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }


  private errorHandler(err) {
    console.log('Error occurred.', err);
    return Promise.reject(err.message || err);
  }

  public register(body: any): Promise<any[]> {
    return this.http.post(this.host + '/api/v1/message/post', body)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public delete(body: any): Promise<any[]> {
    console.log('httpClientService -> body: ', body)
    return this.http.delete(this.host + '/api/v1/message/delete', body)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }
}

