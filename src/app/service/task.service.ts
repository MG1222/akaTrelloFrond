import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  allTasks: Object[] = [];
  todoTasks: Object[] = [];
  doingTasks: Object[] = [];
  doneTasks: Object[] = [];

  allStatus = [
    { name: "To do", value: "todo", default: true, disabled: true },
    { name: "Doing", value: "doing", default: true, disabled: true },
    { name: "Done", value: "done", default: true, disabled: true },
  ];
  allMembers = [
    { id: 1, name: "Dorian" },
    { id: 2, name: "Vincent" },
    { id: 3, name: "Fred" },
    { id: 4, name: "Margad" },
  ];

  selectedItem = {
    id: "-1",
    taskTitle: "Default Title",
    taskDescription: "taskDescription",
    taskStatus: "taskStatus",
    comments: "comments",
    taskMembers: "taskMembers",
    startDate: "date",
    endDate: "date",
  };

  isModalOpen = false;
  isCreateModalOpen = false;

  getTasks(): Observable<any> {
    return this.http.get<Object[]>("http://localhost:3001/tasks").pipe(
        tap((tasks) => {
          this.allTasks = tasks;
          this.todoTasks = this.allTasks.filter(
              (task: any) => task.taskStatus === "todo"
          );
          this.doingTasks = this.allTasks.filter(
              (task: any) => task.taskStatus === "doing"
          );
          this.doneTasks = this.allTasks.filter(
              (task: any) => task.taskStatus === "done"
          );
        })
    );
  }

  addTask(task: any) {
    this.http.post("http://localhost:3001/tasks", task).toPromise();
    this.initDB();
  }

  updateTask(id: any, task: any) {
    console.log("updateTask", id, task);
    this.http.put(`http://localhost:3001/tasks/${id}`, task).toPromise();
    this.initDB();
  }

  deleteTask(id: any) {
    this.http.delete(`http://localhost:3001/tasks/${id}`).toPromise();
    this.initDB();
  }

  initDB() {
    this.getTasks().subscribe((data) => {
      this.allTasks = data;
    });
  }
}
