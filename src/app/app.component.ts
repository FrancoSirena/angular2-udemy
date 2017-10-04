import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app - '.concat(environment.customProperty) ;

  constructor(public authService: AuthService) {
  }

  logout($event) {
    $event.preventDefault();
    this.authService.logout();

  }
}
