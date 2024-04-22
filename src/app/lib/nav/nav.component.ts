import { Component, OnInit } from "@angular/core";
import { ProjectService } from "src/app/service/project.service";
import { TaskService } from "src/app/service/task.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    public projectService: ProjectService
  ) {}

  ngOnInit(): void {}
}
