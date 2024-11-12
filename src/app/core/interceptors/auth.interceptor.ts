import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Cookies from 'js-cookie';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const token = Cookies.get('token');
  const ALLOWED_PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register'];
  const isPublicEndpoint = ALLOWED_PUBLIC_ENDPOINTS.some(endpoint => request.url.includes(endpoint));

  if (isPublicEndpoint) {
    return next(request);
  }

  const authRequest = token
    ? request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : request;

  // Handle the response
  return next(authRequest).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.warn('Unauthorized access - token may have expired. Redirecting to login...');
        window.location.href = '/auth/login';
      }
      return throwError(() => error);
    })
  );
};