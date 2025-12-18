import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          return {
            statusCodes: error.getStatus(),
            success: false,
            message: error.getResponse().message,
          };
        });
      }),
    );
    /*
    (
      catchError((error) => {
        return throwError(
          () => new HttpException({ message: 'An Error has Occurred' }, 400),
        );
      }),
    );
    */
  }
}
