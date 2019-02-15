import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    //console.log('Intercepted!', req);
    return next.handle(req).pipe(tap( event => {
      console.log('Logging interceptor', event)
    }));
  }
}
