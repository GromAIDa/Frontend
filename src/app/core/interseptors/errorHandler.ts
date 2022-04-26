import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast/toast.service';
import { ResponseError } from '@interfaces/errors';

@Injectable()
export class ErrorHandler implements HttpInterceptor { // need renaming
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        (error) => {
          const errorMsg = error.error.errors?.map((el: ResponseError) => el.msg).join(', ');
            if(errorMsg){
              this.toastService.error(errorMsg, 'close')
            }
        },
      ),
    );
  }
}
