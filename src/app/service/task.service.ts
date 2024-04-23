import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Task } from "../types";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private taskListUpdated = new Subject<boolean>();

  allTasks: Object[] = [];
  todoTasks: Object[] = [];
  doingTasks: Object[] = [];
  doneTasks: Object[] = [];

  isCreateModalOpen = true;

  allStatus = [
    { name: "To do", value: "todo", default: true, disabled: true },
    { name: "Doing", value: "doing", default: true, disabled: true },
    { name: "Done", value: "done", default: true, disabled: true },
  ];

  allTags = [
    { text: "Tag 1", selected: false, value: "tag1" },
    { text: "Tag 2", selected: false, value: "tag2" },
    { text: "Tag 3", selected: false, value: "tag3" },
    { text: "Tag 4", selected: false, value: "tag4" },
  ];

  allMembers = [
    { id: 1, name: "Dorian" },
    { id: 2, name: "Vincent" },
    { id: 3, name: "Fred" },
    { id: 4, name: "Margad" },
  ];

  selectedItem: Task = {
    name: "Default Title",
    description: "taskDescription",
    startdate: null,
    enddate: null,
    position: -1,
    statusEnum: "taskStatus",
    listEntityId: -1,
    listLabelEntityId: [],
    membreId: -1,
  };

  getTasks(): Observable<any> {
    return this.http.get<Object[]>("http://localhost:8080/task").pipe(
      tap((tasks) => {
        this.allTasks = tasks;
      })
    );
  }

  async addTask(task: any) {
    await this.http.post("http://localhost:8080/task", task).toPromise();
    await this.initDB();
    this.taskListUpdated.next(true);
  }

  async updateTask(id: any, task: any) {
    console.log("updateTask", id, task);
    await this.http.put(`http://localhost:8080/task/${id}`, task).toPromise();
    await this.initDB();
  }

  async deleteTask(id: any) {
    await this.http.delete(`http://localhost:8080/task/${id}`).toPromise();
    await this.initDB();
    this.taskListUpdated.next(true);
  }

  async initDB() {
    const data = await this.getTasks().toPromise();
    this.allTasks = data;
  }

  get taskListUpdateNotifier(): Observable<boolean> {
    return this.taskListUpdated.asObservable();
  }

  /*   getLabels(): Observable<any> {
    return this.http
      .get<{ text: string; selected: boolean; value: string }[]>(
        `http://localhost:8080/label/}`
      )
      .pipe(
        tap((labels) => {
          this.allTags = labels;
          console.log(labels);
        })
      );
  } */
}
