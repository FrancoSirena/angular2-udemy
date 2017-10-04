import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  loginIn: boolean;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logIn(credentials: any) {
    this.loginIn = true;
    this.authService.login(credentials)
      .subscribe(
        resp => {
          this.loginIn = false;
          if (resp) {
            const url = this.route.snapshot.queryParamMap.get('returnUrl');
            if (url) {
              this.router.navigateByUrl(url);
            } else {
              this.router.navigate(['/']);
            }
          } else {
            this.invalidLogin = true;
          }
        },
        err => {
          this.loginIn = false;
          this.invalidLogin = true;
        });
  }

}
