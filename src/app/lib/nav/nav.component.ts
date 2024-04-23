import { Component, OnInit } from "@angular/core";
import { MembreService } from "src/app/service/membre.service";
import { ProjectService } from "src/app/service/project.service";
import { TaskService } from "src/app/service/task.service";
import { Project } from "src/app/types";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    public projectService: ProjectService,
    public memberService: MembreService
  ) {}

  allProjects: Project[] = [];
  userId = this.memberService.loggedInUser;

  ngOnInit(): void {
    //this.allProjects = this.projectService.getProjects(userId);
    this.projectService.getProjects(this.userId).subscribe({
      next: (projects) => {
        this.allProjects = projects;
      },
      error: (err) => {
        console.error("Impossible de récupérer les projets : ", err);
      },
    });
  }
}
