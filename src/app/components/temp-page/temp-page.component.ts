import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-temp-page',
  templateUrl: './temp-page.component.html',
  styleUrls: ['./temp-page.component.css']
})
export class TempPageComponent implements OnInit {

  // private tempUrl = 'http://localhost:3000/api/v1/user/test';
  private tempUrl = 'http://localhost:3000/api/v1';

  public param: any = {};

  public messageInfo: any = {
    id: null,
    message: null
  };

  public messageInfoList: any = [this.messageInfo];

  public messageId: number = 1;

  public message: string = '';

  constructor(
    // private http: HttpClient,
    private httpClientService: HttpClientService
  ) { }

  ngOnInit(): void {
    // const result = this.getPage();
    // console.log(result.subscribe(value => {
    //   return value.toString();
    // }));

    this.httpClientService.get()
      .then(
        (response) => {
          this.param = response;
          this.messageInfoList = this.param.messages;
        }
      )
      .catch(
        (error) => console.log(error)
      );
  }

  // getPage() {
  //   return this.http.get(this.tempUrl);
  // }
}
