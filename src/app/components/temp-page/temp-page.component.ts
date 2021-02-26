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
  public articleParam: any = {};

  public messageInfo: any = {
    id: null,
    message: null
  };

  public messageInfoList: any = [this.messageInfo];
  public articleList: any;

  public messageId: number = 1;

  public message: string = 'Default Message';

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

    this.httpClientService.articleGet()
      .then((response) => {
        // this.articleParam = response;
        this.articleList = response;

      })
  }

  // getPage() {
  //   return this.http.get(this.tempUrl);
  // }

  public onClickRegister() {
    const body: any = {
      id: this.messageId,
      message: this.message
    };
    this.httpClientService.register(body)
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

  public onClickDelete() {
    console.log('messageId: ', this.messageId);
    console.log('message: ', this.message);
    const body: any = {
      id: this.messageId,
      message: this.message
    };

    this.httpClientService.delete(body)
    .then(
      response => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      }
    )
    .catch(
      (error) => console.log(error)
    );
  }
}
