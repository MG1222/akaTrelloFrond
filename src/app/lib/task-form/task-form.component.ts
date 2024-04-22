import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { ListComponent } from "../list/list.component";
import { TaskService } from "../../service/task.service";
import { ListService } from "src/app/service/list.service";
import { List, MemberInfo } from "src/app/types";
import { MembreService } from "src/app/service/membre.service";

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: [`./task-form.component.scss`],
})
export class TaskFormComponent implements OnInit {
  nrSelect: string = "TODO";
  nrSelectMember: string = "default";
  taskForm = new FormGroup({
    name: new FormControl("From Form"),
    description: new FormControl("default form description"),
    startDate: new FormControl("1991-10-29"),
    endDate: new FormControl("1991-10-29"),
    statusEnum: new FormControl("TODO"),
    listEntityId: new FormControl("default form"),
    listLabelEntityId: new FormControl(null),
    membreId: new FormControl(null),
  });

  @ViewChild(ListComponent) childComponent!: ListComponent;

  constructor(
    public taskService: TaskService,
    private listService: ListService,
    private memberService: MembreService
  ) {}

  projectId: number = 2;
  lists: List[] = [];
  members: MemberInfo[] = [];

  ngOnInit(): void {
    //this.taskService.addTask(this.taskForm.value);
    this.listService.getLists(this.projectId).subscribe({
      next: (lists) => {
        this.lists = lists;
      },
      error: (err) => {
        console.error("Impossible de récupérer les listes : ", err);
      },
    });

    this.memberService.getMembers(this.projectId).subscribe({
      next: (members) => {
        this.members = members;
      },
      error: (err) => {
        console.error("Impossible de récupérer les membres : ", err);
      },
    });
  }

  onSubmit(): void {
    // Ayant le nom du membre, on cherche à récupérer le membreId pour l'insertion en base
    const username = this.taskForm.value.membreId;
    const user = this.members.find((member) => member.username === username);
    if (user) {
      // Remplace le membreId avec la bonne valeur
      const taskData = { ...this.taskForm.value, membreId: user.membreId };
      this.addTask(taskData);
    }
    // Si on ne met pas de membre assigné à la tâche
    else {
      this.addTask(this.taskForm.value);
    }

    this.taskForm.reset();
  }

  // Appel au service pour ajouter la tâche
  addTask(task: Task) {
    this.taskService
      .addTask(task)
      .then(() => {
        this.taskService.notifyTaskListUpdated();
      })
      .catch((err) => {
        console.error("Error adding task:", err);
      });
  }
}
