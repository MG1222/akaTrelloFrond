import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MembreService {
  constructor(private http: HttpClient) {}

  allMembers: Object[] = [];

  selectedItem = {
    userId: "-1",
    projectId: "-1",
    roleEnum: "",
  };

  getMembers(idproject: number): Observable<any> {
    return this.http
      .get<Object[]>(`http://localhost:8080/member/project/${idproject}`)
      .pipe(
        tap((members) => {
          this.allMembers = members;
        })
      );
  }
}
