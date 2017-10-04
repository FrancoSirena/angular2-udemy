import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: AuthHttp) { }

  ngOnInit() {
    // adding bearer with http service
    // let headers = new Headers();
    // headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // let options = new RequestOptions({headers: headers});
    // this.http.get('url', options,);

    // sign AuthHTTP
    this.http.get('/api/profile')
      .subscribe(resp => console.log(resp));
  }

}
