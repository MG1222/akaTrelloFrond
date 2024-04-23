import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { TaskService } from "../../service/task.service";
import { ListService } from "src/app/service/list.service";
import { MembreService } from "src/app/service/membre.service";
import { List, Task } from "src/app/types";
import { MemberInfo } from "src/app/types";
import { of, Subject } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { tap, takeUntil } from "rxjs/operators";
import { ERROR_COMPONENT_TYPE } from "@angular/compiler";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnChanges, OnDestroy {
  @Input() parentData!: any;
  @ViewChild(ListComponent) childComponent!: ListComponent;

  isModalOpen = true;
  isEditMode = false;
  filteredTasksTodo!: any[];
  lastExecutionTime = 0;
  grabbedItem: any = "";
  hoveredList = "";
  taskDragDrop: Task = {
    id: 0,
    name: "",
    description: "",
    position: 0,
    statusEnum: "",
    listEntityId: 0,
    listLabelEntityId: [],
    membreId: 0,
  };

  constructor(
    public taskService: TaskService,
    private listService: ListService,
    private memberService: MembreService
  ) {}

  private unsubscribe$ = new Subject<void>();

  lists: List[] = [];
  members: MemberInfo[] = [];
  selectedList: string = "";
  selectedMember: string = "";
  projectId: number = parseInt(window.location.pathname.split("/")[2]);
  allTasks: Task[] = [];
  tasksByList: { [key: number]: Task[] } = {};
  nameMemberTask: string = "";

  ngOnInit() {
    this.taskService.initDB();
    this.refreshList();
    this.taskService.taskListUpdateNotifier
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((updated) => {
        if (updated) {
          this.refreshList();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  refreshList() {
    this.listService
      .getLists(this.projectId)
      .pipe(
        tap((lists) => {
          this.lists = lists;
        }),
        catchError((err) => {
          console.error("Impossible de récupérer les listes : ", err);
          return of([]); // Retourner un observable vide pour continuer la chaîne
        }),
        switchMap(() => this.memberService.getMembers(this.projectId)) // Chain after lists are fetched
      )
      .subscribe({
        next: (members) => {
          this.members = members;
          // On souhaite récupérer les tâches après les Lists et les Membres pour éviter les boucles
          this.initializeTasks();
        },
        error: (err) => {
          console.error("Impossible de récupérer les membres : ", err);
        },
      });
  }

  initializeTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.allTasks = tasks;
        this.lists.forEach(list => {
          this.tasksByList[list.id] = tasks.filter(task => task.listEntityId === list.id);
        });
        console.log('Tasks organized by lists');
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
}

  ngOnChanges(changes: SimpleChanges) {
    (async () => {
      this.taskService.initDB();
      this.filteredTasksTodo = this.taskService.todoTasks;
    })();
  }

  limitedConsoleL(text: any) {
    const now = Date.now();
    if (now - this.lastExecutionTime >= 200) {
      console.log(text);
      this.lastExecutionTime = now;
      this.hoveredList = text;
    }
  }

  onMouseUpHandle(event: any) {
    event?.preventDefault();
    console.log("Mouse up");
    /*     this.taskService.updateTask(this.grabbedItem.id, this.grabbedItem); */
  }

  consoleL(text: any, item: any) {
    this.grabbedItem = text;
    console.log("000 " + this.grabbedItem + "  " + this.hoveredList);
    this.taskDragDrop = item.value;
  }

  clickHandle(item: any) {
    this.taskService.selectedItem = item.value;
    const testList = this.lists.find((l) => l.id === item.value.listEntityId);
    if (testList) {
      this.selectedList = this.taskService.selectedItem.statusEnum;
    }

    const testMember = this.members.find(
      (m) => m.userId === item.value.membreId
    );
    if (testMember) {
      this.selectedMember = testMember.username;
    }

    this.closeModal();
  }

  closeModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  updateModal() {
    this.taskService
      .updateTask(
        this.taskService.selectedItem.id,
        this.taskService.selectedItem
      )
      .then(() => {
        this.updateTasksByList(this.taskService.selectedItem);
        this.taskService.initDB();
        this.closeModal();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la tâche", error);
      });
  }

  updateTasksByList(updatedTask: Task) {
    // Vérifier si la tâche est déjà dans la bonne liste
    if (
      this.tasksByList[updatedTask.listEntityId] &&
      this.tasksByList[updatedTask.listEntityId].some(
        (task) => task.id === updatedTask.id
      )
    ) {
      // Mettre à jour la tâche dans la liste actuelle sans la retirer et la réajouter
      this.tasksByList[updatedTask.listEntityId] = this.tasksByList[
        updatedTask.listEntityId
      ].map((task) => (task.id === updatedTask.id ? updatedTask : task));
    } else {
      // Retirer la tâche de son ancienne liste si l'ID de la liste a changé
      Object.keys(this.tasksByList).forEach((key) => {
        const listId = parseInt(key, 10);
        this.tasksByList[listId] = this.tasksByList[listId].filter(
          (task) => task.id !== updatedTask.id
        );
      });

      // Ajouter la tâche à sa nouvelle liste
      if (!this.tasksByList[updatedTask.listEntityId]) {
        this.tasksByList[updatedTask.listEntityId] = [];
      }
      this.tasksByList[updatedTask.listEntityId].push(updatedTask);
    }
  }

  deleteModal(idTask: any) {
    this.taskService.deleteTask(idTask);
    this.taskService.initDB();
    this.closeModal();
  }

  onListChange(listEntityId: number) {
    const list = this.lists.find((l) => l.id === listEntityId);
    if (list) {
      this.selectedList = list.name;
    }
  }

  onMemberChange(memberId: number) {
    const member = this.members.find((l) => l.userId === memberId);
    if (member) {
      this.selectedMember = member.username;
      this.nameMemberTask = member.username.substring(0, 1).toUpperCase();
    } else {
      this.selectedMember = "";
      this.nameMemberTask = "";
    }
  }

  get selectedItem() {
    return this.taskService.selectedItem;
  }

  set selectedItem(value) {
    this.taskService.selectedItem = value;
  }


}
