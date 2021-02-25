import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-temp-page',
  templateUrl: './temp-page.component.html',
  styleUrls: ['./temp-page.component.css']
})
export class TempPageComponent implements OnInit {

  private tempUrl = 'http://localhost:3000/api/v1/user/test';
  // private tempUrl = 'api/v1/test';


  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    const result = this.getPage();
    console.log(result.subscribe(value => {
      return value;
    }));
  }

  getPage() {
    return this.http.get(this.tempUrl);
  }
}
