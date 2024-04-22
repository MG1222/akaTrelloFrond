import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { ListComponent } from "../list/list.component";
import { TaskService } from "../../service/task.service";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: [`./task-form.component.scss`],
})
export class TaskFormComponent implements OnInit {
  @ViewChild(ListComponent) childComponent!: ListComponent;

  nrSelect: string = "todo";
  nrSelectMember: string = this.taskService.allMembers[0].name;

  constructor(public taskService: TaskService) {}

  taskForm!: FormGroup;

  ngOnInit(): void {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const defaultTaskTitle = `${hours}:${minutes}:${seconds}`;

    this.taskForm = new FormGroup({
      taskTitle: new FormControl("defaultTaskTitle " + defaultTaskTitle),
      taskDescription: new FormControl("default form description"),
      taskStatus: new FormControl(),
      comments: new FormControl("default form"),
      taskMembers: new FormControl("default form"),
      startDate: new FormControl("11/10/1991"),
      endDate: new FormControl("1991-10-11"),
      tags: new FormArray([]),
    });
  }

  onSubmit(): void {
    const filteredTags = this.taskService.allTags.filter(
      (tag: any) => tag.selected === true
    );
    const tagsFormArray = this.taskForm.get("tags") as FormArray;
    tagsFormArray.clear();
    filteredTags.forEach((tag) => tagsFormArray.push(new FormControl(tag)));
    this.taskService.addTask(this.taskForm.value);
  }
}
