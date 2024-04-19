import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ListComponent } from "../list/list.component";
import {TaskService} from "../../service/task.service";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: [`./task-form.component.scss`],
})
export class TaskFormComponent implements OnInit {
  nrSelect: string = "todo";
  nrSelectMember: string = "default";
  taskForm = new FormGroup({
    taskTitle: new FormControl("From Form"),
    taskDescription: new FormControl("default form description"),
    taskStatus: new FormControl(),
    comments: new FormControl("default form"),
    taskMembers: new FormControl("default form"),
    date: new FormControl("11/10/1991"),
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

