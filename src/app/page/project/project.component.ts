import { Component, OnInit } from '@angular/core';

import { TaskService } from 'src/app/service/task.service';
import { ListService } from 'src/app/service/list.service';
import { MembreService } from 'src/app/service/membre.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
