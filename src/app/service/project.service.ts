import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TaskService } from "./task.service";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient, public taskService: TaskService) {}
  isModalProjectOpen = false;

  private projectListUpdated = new Subject<boolean>();

  allProjects: Object[] = [];

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
  }

  async deleteProject(id: any) {
    await this.http.delete(`http://localhost:8080/project/${id}`).toPromise();
    this.projectListUpdated.next(true);
  }

  async updateProject(id: any, project: any) {
    await this.http
      .put(`http://localhost:8080/project/${id}`, project)
      .toPromise();
  }
}
