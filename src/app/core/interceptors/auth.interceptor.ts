// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');

  const PUBLIC_URLS = ['/login', '/register'];

  const isPublicUrl = PUBLIC_URLS.some(url => request.url.includes(url));
  
  if (isPublicUrl) {
    return next(request);
  }
  
  if (token) {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return next(clonedRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Unauthorized - redirecting to login');
          localStorage.removeItem('token');
        }
        return throwError(() => error);
      })
    );
  }
  
  return next(request);
};