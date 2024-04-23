import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  isModalProjectOpen = false;

  allProjects: Object[] = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
    { id: 4, name: "Project 4" },
  ];

  getProjects(iduser: number): Observable<any> {
    return this.http
      .get<Object[]>(`http://localhost:8080/project/user/${iduser}`)
      .pipe(
        tap((projects) => {
          this.allProjects = projects;
        })
      );
  }

  async addProject(project: any) {
    await this.http.post("http://localhost:8080/project", project).toPromise();
    /*    await this.initDB();
    this.taskListUpdated.next(true); */
  }
}
