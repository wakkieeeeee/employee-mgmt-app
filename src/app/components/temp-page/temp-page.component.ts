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

  // public messageInfo: any = {
  //   id: null,
  //   message: null
  // };

  public messageInfo: any = {
    no: null,
    message: null,
    date: null,
    isEdit: true
  }



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


    // 以下をBackend APIから受け取る
    //   status: 200,
    //   response: 'Hello, this is message api',
    //   messages: storages --> id, message
    // this.httpClientService.get()
    //   .then(
    //     (response) => {
    //       this.param = response;
    //       this.messageInfoList = this.param.messages;

    //       // this.messageInfoList
    //       console.log('this.messageInfoList.length:', this.messageInfoList.length);
    //       console.log('this.messageInfoList:', this.messageInfoList);

    //       this.messageId = this.messageInfoList.length;
    //     }
    //   )
    //   .catch(
    //     (error) => console.log(error)
    //   );

    this.testGet();

    this.httpClientService.articleGet()
      .then((response) => {
        // this.articleParam = response;
        this.articleList = response;

      })
  }

  private testGet() {
    this.httpClientService.testget()
    .then(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param;
        console.log('messageInfoList: ', this.messageInfoList);
      }
    )
    .catch(
      (error) => console.log(error)
    );
  }

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
            this.messageId++;
          }
        )
        .catch(
          (error) => console.log(error)
        );
  }


  // http clientでHTMLから受け取ったデータをバックエンドAPIに渡して、
  // DBに格納、再表示
  public onClickRegister2(message: string) {
    const body: any = {
      message: message
    }
    this.httpClientService.register(body)
      .then(
        (response) => {
          this.param = response;
          console.log('param.message: ', this.param.message);
          this.messageInfoList.message = this.param.message;
          //自動で再表示されないので、以下を実行
          this.testGet();
        }
      )
      .catch(
        (error) => console.log(error)
      );
  }


  public onClickDelete(no: number): void {
    console.log('no: ', no);
    const body: any = {
      no: no,
    };
    console.log('body: ',body);
    this.httpClientService.delete(body)
    .then(
      response => {
        this.param = response;
        this.messageInfoList = this.param.messages;
        console.log('messageInfoList: ', this.messageInfoList);
        this.testGet();
      }
    )
    .catch(
      (error) => console.log(error)
    );
  }
  // public onClickDelete() {
  //   console.log('messageId: ', this.messageId);
  //   console.log('message: ', this.message);
  //   const body: any = {
  //     id: this.messageId,
  //     message: this.message
  //   };
  //   console.log('body: ',body);
  //   this.httpClientService.delete(body)
  //   .then(
  //     response => {
  //       this.param = response;
  //       this.messageInfoList = this.param.messages;
  //     }
  //   )
  //   .catch(
  //     (error) => console.log(error)
  //   );
  // }
}
