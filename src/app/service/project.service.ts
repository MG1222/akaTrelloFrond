import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  allProjects: Object[] = [];
}
