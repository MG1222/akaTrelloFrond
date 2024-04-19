import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

import {TaskService} from "../../service/task.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnChanges {
  @Input() parentData!: any;
  @ViewChild(ListComponent) childComponent!: ListComponent;

  isModalOpen = true;
  isModalCreateOpen = true;
  filteredTasksTodo!: any[];
  lastExecutionTime = 0;
  grabbedItem: any = "";
  hoveredList = "";

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.taskService.initDB();
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

  get selectedItem() {
    return this.taskService.selectedItem;
  }

  set selectedItem(value) {
    this.taskService.selectedItem = value;
  }
}
