import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient
  ) { }


  allLists: Object[] = [];


  selectedItem = {
    id: "-1",
    name: "Default Title",
    position: -1,
    statusEnum: "listStatus",
    listTaskDTO: [],
    projectId: -1,
    
  };


  getTasks(idproject: number): Observable<any> {
    return this.http.get<Object[]>(`http://localhost:5000/list/project/${idproject}`).pipe(
        tap((lists) => {
          this.allLists = lists;
        })
    );
  }

}
