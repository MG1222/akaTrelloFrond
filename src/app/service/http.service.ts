import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: this.auth.accessToken
          ? `Bearer ${this.auth.accessToken}`
          : "",
      },
    });

    const apiReq = authReq.clone({ url: `http://localhost:8080${req.url}` });
    return next.handle(apiReq);
  }
}
