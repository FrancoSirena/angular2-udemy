import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GitHubService extends ApiService {

    constructor(http: Http) {
        super('https://api.github.com/users/', http);
    }
}
