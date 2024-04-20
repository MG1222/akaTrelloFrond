import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap} from "rxjs/operators";
import { Task } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  private taskListUpdated = new Subject<boolean>();

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

  selectedItem: Task = {
    name: "Default Title",
    description: "taskDescription",
    startDate: null,
    endDate: null,
    position: -1,
    statusEnum: "taskStatus",
    listEntityId: -1,
    listLabelEntityId: [],
    membreId: -1,
  };

  isModalOpen = false;
  isCreateModalOpen = false;

  getTasks(): Observable<any> {
    return this.http.get<Object[]>("http://localhost:5000/task").pipe(
        tap((tasks) => {
          this.allTasks = tasks;
       
        })
    );
  }

  async addTask(task: any) {
    await this.http.post("http://localhost:5000/task", task).toPromise();
    await this.initDB();
    this.taskListUpdated.next(true);
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
  

  get taskListUpdateNotifier(): Observable<boolean> {
    return this.taskListUpdated.asObservable();
  }

  // Utilisez cette méthode pour déclencher une mise à jour
public notifyTaskListUpdated(): void {
  this.taskListUpdated.next(true);
}
}
