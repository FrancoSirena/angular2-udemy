import { GitHubService } from './../services/github.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css']
})
export class FollowerComponent implements OnInit {
  user: any;
  constructor(private route: ActivatedRoute, private gitHubService: GitHubService) { }

  ngOnInit() {
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .switchMap(combined => {
      return this.gitHubService.get(combined[0].get('username'));
    })
    .subscribe(user => {
      this.user = user;
    });
    // this.route.snapshot.paramMap['username'] -- When you can't change the param value without destroying the component
  }

}
