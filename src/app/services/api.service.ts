import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppError } from './../common/app-error';
import { NotFoundError } from './../common/not-found-error';

@Injectable()
export class ApiService {
    constructor(@Inject(Http) private url: string, private http: Http) {}

    get(params?: string) {
        return this.http.get(this.url.concat(params || ''))
                .map(response => response.json())
                .catch((error: Response) => {
                    if (error.status === 404) {
                        return Observable.throw(new NotFoundError(error));
                    }

                    return Observable.throw(new AppError(error));

                });
    }

}
