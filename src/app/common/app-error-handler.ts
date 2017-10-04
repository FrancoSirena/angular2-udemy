import { ErrorHandler } from '@angular/core';


export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        alert('Some error occured');
        console.log(error);
    }
}
