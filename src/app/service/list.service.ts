import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { List } from "../types";

@Injectable({
  providedIn: "root",
})
export class ListService {
  constructor(private http: HttpClient) {}

  allLists: Object[] = [];

  selectedItem: List = {
    id: 0,
    name: "",
    position: 0,
    statusEnum: "listStatus",
    listTaskDTO: [],
    projectId: 0,
  };

  getLists(idproject: number): Observable<any> {
<<<<<<< HEAD
    return this.http.get<Object[]>(`http://localhost:8080/list/project/${idproject}`).pipe(
=======
    return this.http
      .get<Object[]>(`http://localhost:8080/list/project/${idproject}`)
      .pipe(
>>>>>>> f50bfacb5a401aa996742ef766bc599b04ee2c23
        tap((lists) => {
          this.allLists = lists;
        })
      );
  }
}
