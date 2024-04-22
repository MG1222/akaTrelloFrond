import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  allTasks: Object[] = [];
  todoTasks: Object[] = [];
  doingTasks: Object[] = [];
  doneTasks: Object[] = [];

  isCreateModalOpen = false;

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
  allProjects = [
    { id: 1, name: "Projet 1" },
    { id: 2, name: "Projet 2" },
    { id: 3, name: "Projet 3" },
    { id: 4, name: "Projet 4" },
  ];
  allTags = [
    { id: 1, text: "Urgent", color: "red", selected: false },
    { id: 2, text: "Back", color: "cyan", selected: false },
    { id: 3, text: "Front", color: "lightgreen", selected: false },
    { id: 4, text: "Idea", color: "yellow", selected: false },
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
    tags: [
      {
        id: 1,
        text: "Books",
        color: "red",
        selected: true,
      },
      {
        id: 2,
        text: "Movies Games",
        color: "blue",
        selected: true,
      },
      {
        id: 3,
        text: "Electromputers",
        color: "green",
        selected: true,
      },
      {
        id: 4,
        text: "Home, Tools",
        color: "yellow",
        selected: true,
      },
    ],
  };

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
