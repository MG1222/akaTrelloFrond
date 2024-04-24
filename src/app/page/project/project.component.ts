import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../service/task.service";
import { ProjectService } from "src/app/service/project.service";
import { MembreService } from "src/app/service/membre.service";
import { Project } from "src/app/types";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    public projectService: ProjectService,
    public memberService: MembreService
  ) {}

  projectId: number = parseInt(window.location.pathname.split("/")[2]);
  allProjects: any[] = [];
  currentProject: any;
  userId = this.memberService.loggedInUser;

  /*   project = this.projectService.allProjects.filter( project => project.id === this.projectId)[0];
   */
  ngOnInit(): void {
    //this.allProjects = this.projectService.getProjects(userId);
    this.projectService.getProjects(this.userId).subscribe({
      next: (projects) => {
        this.allProjects = projects;
        this.currentProject = projects.find((p:Project) => p.id === this.projectId);
      },
      error: (err) => {
        console.error("Impossible de récupérer les projets : ", err);
      },
    });
    console.log("this.projectId : " + this.projectId);
    console.log("this.userId : " + this.userId);
    console.log(this.allProjects);
  }
}
