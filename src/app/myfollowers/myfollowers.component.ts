import { GitHubService } from './../services/github.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';
@Component({
  selector: 'app-myfollowers',
  templateUrl: './myfollowers.component.html',
  styleUrls: ['./myfollowers.component.css']
})
export class MyfollowersComponent implements OnInit {
  followers: Array<any>;
  me: any;
  constructor(private gitHubService: GitHubService, private router: Router) { }

  ngOnInit() {
    // get query params - this.route.queryParamMap ( observable or the snapshot )
    this.gitHubService.get('francosirena')
      .subscribe(resp => {
        this.me = resp;
      });
    this.gitHubService.get('francosirena/followers')
        .subscribe(followers => this.followers = followers);
  }

  goHome() {
      this.router.navigate(['home'], {queryParams: { test: 1}});
  }

}
