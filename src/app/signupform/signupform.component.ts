import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { UsernameValidators } from './username.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.css']
})
export class SignupformComponent {
  form = new FormGroup({
    'account': new FormGroup({
      'number': new FormControl()
    }),
    'username': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace
    ],
    UsernameValidators.shouldBeUnique),
    'password': new FormControl(),
    'courses': new FormArray([])
  });
  constructor(private http: Http, private route: Router) { }

  submit() {
    // this.form.setErrors({login: true});
    this.http.post('/api/signup', this.form.value)
      .subscribe(response => {
        if (response.status === 401) {
          this.form.setErrors({login: true});
        } else {
          this.route.navigate(['/']);
        }
      });
  }

  removeItem(course: FormControl) {
    const idx = this.courses.controls.indexOf(course);
    this.courses.removeAt(idx);
  }

  addCourse(course: HTMLInputElement) {
    (this.courses as FormArray).push(new FormControl(course.value));
    course.value = '';
  }

  get username(){
    return this.form.get('username');
  }

  get courses() {
    return (this.form.get('courses') as FormArray);
  }

}
