import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../service/task.service";
import { ProjectService } from "src/app/service/project.service";
import { MembreService } from "src/app/service/membre.service";
import { FormControl, FormGroup } from "@angular/forms";

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
  allUsers: any[] = [];
  userId = this.memberService.loggedInUser;
  isModalModifProjectOpen = false;

  nrSelect = "TODO";
  nrSelectMember = this.memberService.loggedInUser;
  taskForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl("default description"),
    startdate: new FormControl("1991-10-29"),
    enddate: new FormControl("1991-10-29"),
    listEntityId: new FormControl("default form"),
    listLabelEntityId: new FormControl(null),
    membreId: new FormControl(),
  });

  /*   project = this.projectService.allProjects.filter( project => project.id === this.projectId)[0];
   */
  ngOnInit(): void {
    //this.allProjects = this.projectService.getProjects(userId);
    this.projectService.getProjects(this.userId).subscribe({
      next: (projects) => {
        this.allProjects = projects.filter((e: any) => e.id === this.projectId);
      },
      error: (err) => {
        console.error("Impossible de récupérer les projets : ", err);
      },
    });

    this.memberService.getUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (err) => {
        console.error("Impossible de récupérer les utilisateurs : ", err);
      },
    });

    console.log(this.allProjects);
  }
}
