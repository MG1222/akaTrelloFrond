import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }


  allTasks: Object[] = [];
  todoTasks: Object[] = [];
  doingTasks: Object[] = [];
  doneTasks: Object[] = [];

  selectedItem = {
    id: "-1",
    name: "Default Title",
    description: "taskDescription",
    startDate: "date",
    endDate: "date",
    position: -1,
    statusEnum: "taskStatus",
    listEntityId: -1,
    listLabelEntityId: [],
    membreId: -1,
    
  };

  isModalOpen = false;

  getTasks(): Observable<any> {
    return this.http.get<Object[]>("http://localhost:5000/task").pipe(
        tap((tasks) => {
          this.allTasks = tasks;
          this.todoTasks = this.allTasks.filter(
              (task: any) => task.statusEnum === "TODO"
          );
          console.log(this.todoTasks);
          this.doingTasks = this.allTasks.filter(
              (task: any) => task.statusEnum === "IN_PROGRESS"
          );
          this.doneTasks = this.allTasks.filter(
              (task: any) => task.statusEnum === "DONE"
          );
        })
    );
  }

  async addTask(task: any) {
    await this.http.post("http://localhost:5000/task", task).toPromise();
    await this.initDB();
  }

  async updateTask(id: any, task: any) {
    console.log("updateTask", id, task);
    await this.http.put(`http://localhost:5000/task/${id}`, task).toPromise();
    await this.initDB();
  }

  async deleteTask(id: any) {
    await this.http.delete(`http://localhost:5000/task/${id}`).toPromise();
    await this.initDB();
  }

  async initDB() {
      const data = await this.getTasks().toPromise();
      this.allTasks = data;
    };
  
}
