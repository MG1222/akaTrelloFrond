import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import { TaskService } from "../../service/task.service";
import { ListService } from "src/app/service/list.service";
import { MembreService } from "src/app/service/membre.service";

export type List = {
  id: number,
  name: string,
  position: number,
  statusEnum: string,
  listTaskDTO: number[],
  projectId: number
}

export type MemberInfo = {
  membreId: number,
  projectid: number,
  role: string,
  userId: number,
  username: string,
  password: string,
  email: string
}

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})



export class ListComponent implements OnChanges {
  @Input() parentData!: any;
  @ViewChild(ListComponent) childComponent!: ListComponent;

  isModalOpen = true;
  filteredTasksTodo!: any[];
  lastExecutionTime = 0;
  grabbedItem: any = "";
  hoveredList = "";

  constructor(public taskService: TaskService,
    private listService: ListService,
    private memberService: MembreService
  ) {}

  lists: List[] = [];
  members: MemberInfo[] = [];
  selectedList: string = '';
  selectedMember: string = '';
  projectId: number = 2;

  ngOnInit() {
    this.taskService.initDB();
    this.listService.getTasks(this.projectId).subscribe({
      next: (lists) => {
        this.lists = lists;
        //console.log("LSITS " + this.lists);
      },
      error: (err) => {
        console.error('Impossible de récupérer les listes : ', err);
      }
    });

    this.memberService.getMembers(this.projectId).subscribe({
      next: (members) => {
        this.members = members;
        //console.log("MEMBERS " + this.members);
      },
      error: (err) => {
        console.error('Impossible de récupérer les membres : ', err);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {}

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

  consoleL(text: any) {
    this.grabbedItem = text;
    console.log(this.grabbedItem + "  " + this.hoveredList);
  }

  clickHandle(item: any) {
    this.taskService.selectedItem = item.value;
    const testList = this.lists.find(l => l.id === item.value.listEntityId);
    if(testList) {
      this.selectedList = testList.name; 
      console.log("ALLO LIST");
    }
    console.log(item.value.membreId);
    
    const testMember = this.members.find(m => m.userId === item.value.membreId);
    if(testMember) {
      console.log("testMember");
      this.selectedMember = testMember.username; 
    }

    this.closeModal();
  }

  closeModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  updateModal() {
    this.taskService.updateTask(
      this.taskService.selectedItem.id,
      this.taskService.selectedItem
    );
    this.taskService.initDB();
    this.closeModal();
  }

  deleteModal(idTask: any) {
    this.taskService.deleteTask(idTask);
    this.taskService.initDB();
    this.closeModal();
  }

  onListChange(listEntityId: number) {
    console.log('Changing list to:', listEntityId);
    const list = this.lists.find(l => l.id === listEntityId);
    if (list) {
        this.selectedList = list.name;
    }
  }

  onMemberChange(memberId: number) {
    console.log('Changing member to:', memberId);
    const member = this.members.find(l => l.userId === memberId);
    if (member) {
        this.selectedMember = member.username;
    }
    else {
      this.selectedMember = '';
    }
  }

  get selectedItem() {
    return this.taskService.selectedItem;
  }

  set selectedItem(value) {
    this.taskService.selectedItem = value;
  }
}
