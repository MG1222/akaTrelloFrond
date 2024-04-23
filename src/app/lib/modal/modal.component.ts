import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { TaskService } from "../../service/task.service";
import { MembreService } from "src/app/service/membre.service";
import { ProjectService } from "src/app/service/project.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: [
    "./modal.component.scss",
    "../task-form/task-form.component.scss",
  ],
})
export class ModalComponent implements OnInit {
  constructor(
    public taskService: TaskService,
    public projectService: ProjectService,
    public memberService: MembreService
  ) {}

  users: any[] = [];
  listMembreDTO = new FormControl({
    userId: 303,
    roleEnum: "ADMINISTRATEUR",
  });

  projectForm = new FormGroup({
    name: new FormControl("Project x1"),
    description: new FormControl("default form description"),
    listMembreDTO: new FormArray([this.listMembreDTO]),
    startdate: new FormControl("1991-10-11"),
    enddate: new FormControl("1991-10-11"),
  });

  ngOnInit(): void {
    this.memberService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error("Impossible de récupérer les users : ", err);
      },
    });
  }

  onSubmit(): void {
    try {
      this.projectService.addProject(this.projectForm.value);
    } catch (error) {
      console.error("An error occurred: ", error);
    }
    this.projectService.isModalProjectOpen = false;
  }
}
