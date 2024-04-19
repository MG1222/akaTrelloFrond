import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../service/task.service";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  constructor(public taskService: TaskService) {}

  ngOnInit(): void {}
}
