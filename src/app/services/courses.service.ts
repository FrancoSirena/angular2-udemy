import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CoursesService extends ApiService {

  constructor(http: Http) {
    super('https://jsonplaceholder.typicode.com/posts', http);
   }

}
