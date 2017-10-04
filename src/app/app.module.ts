import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MockBackend } from '@angular/http/testing';
import { fakeBackendProvider } from './helpers/fake-backend';
import { GitHubService } from './services/github.service';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, BaseRequestOptions, Http, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';

import { CoursesService } from './services/courses.service';
import { SummaryPipe } from './summary.pipe';
import { AuthorsComponent } from './authors/authors.component';
import { DummyFormComponent } from './dummy-form/dummy-form.component';
import { SignupformComponent } from './signupform/signupform.component';
import { MyfollowersComponent } from './myfollowers/myfollowers.component';
import { AppErrorHandler } from './common/app-error-handler';
import { FollowerComponent } from './follower/follower.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({
    headerName: 'Authorization',
    headerPrefix: 'bearer',
    tokenName: 'token',
    tokenGetter: () => localStorage.getItem('token'),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
    noJwtError: true
  }), http, options);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CoursesComponent
  },
  {
    path: 'course',
    component: DummyFormComponent
  },
  {
    path: 'reactive',
    component: SignupformComponent
  },
  {
    path: 'followers/:username',
    component: FollowerComponent
  },
  {
    path: 'followers',
    component: MyfollowersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SummaryPipe,
    AuthorsComponent,
    DummyFormComponent,
    SignupformComponent,
    MyfollowersComponent,
    FollowerComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ApiService,
    CoursesService,
    GitHubService,
    AuthService,
    AuthGuardService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
