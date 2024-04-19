import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ListComponent } from "../list/list.component";
import {TaskService} from "../../service/task.service";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styles: [
    `
      #taskFormContainer {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > * {
          min-width: 50%;
        }
      }
    `,
  ],
})
export class TaskFormComponent implements OnInit {
  nrSelect: string = "TODO";
  taskForm = new FormGroup({
    name: new FormControl("From Form"),
    description: new FormControl("default form description"),
    startDate: new FormControl("11/10/1991"),
    endDate: new FormControl("11/10/1991"),
    statusEnum: new FormControl(),
    listEntityId: new FormControl("default form"),
    listLabelEntityId: new FormControl("default form"),
    taskMembers: new FormControl("default form"),
    
  });

  @ViewChild(ListComponent) childComponent!: ListComponent;

  constructor(public taskService: TaskService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.taskService.addTask(this.taskForm.value);
    /*     this.childComponent.todoL = [
      ...this.childComponent.todoL,
      this.taskForm.value,
    ]; */
  }
}
