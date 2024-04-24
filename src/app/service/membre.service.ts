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
  allUsers: Object[] = [];
  projectUsers = this.allUsers.filter(
    (user: any) => user.id === this.loggedInUser
  );

  selectedItem = {
    userId: "-1",
    projectId: "-1",
    roleEnum: "",
  };

  loggedInUser = 1;

  getMembers(idproject: number): Observable<any> {
    return this.http
      .get<Object[]>(`http://localhost:8080/member/project/${idproject}`)
      .pipe(
        tap((members) => {
          this.allMembers = members;
        })
      );
  }
  getUsers(): Observable<any> {
    return this.http.get<Object[]>(`http://localhost:8080/user`).pipe(
      tap((users) => {
        this.allUsers = users;
        console.log(this.allUsers); // Add this line to console log users
      })
    );
  }
}
