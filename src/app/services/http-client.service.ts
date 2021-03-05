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

  // 認証トークンを使用するために以下は必要になるが、一旦使わない
  private httpOptions: any = {
    headers: new HttpHeaders({
      // 'Contetnt-Type': 'application/json'
      'Contetnt-Type': 'text/plain'
    }),
    // delete 実行時に'body'が必要になるケースがあるため、プロパティとして残しておく
    body: null
  }


  constructor(
    private http: HttpClient
  ) { }

  // 以下をReturn
  //   status: 200,
  //   response: 'Hello, this is message api',
  //   messages: storages --> id, message
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

    public testget(): Promise<any[]> {
      return this.http.get(this.host + '/api/v1/message/testget')
      .toPromise()
      .then((res) => {
        console.log('res: ', res);
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
    return this.http.post(this.host + '/api/v1/message', body)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  public delete(body: any): Promise<any[]> {
    // this.httpOptions.body = body.no;
    // console.log('httpClientService -> httpOptions.body: ', this.httpOptions)
    // return this.http.delete(this.host + '/api/v1/message/delete', this.httpOptions)
    return this.http.post(this.host + '/api/v1/message/delete', body)
      .toPromise()
      .then(res => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }
}

