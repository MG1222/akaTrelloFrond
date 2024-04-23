import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./page/about/about.component";
import { HomeComponent } from "./page/home/home.component";
import { ContactComponent } from "./page/contact/contact.component";
import { TaskFormComponent } from "./lib/task-form/task-form.component";
import { ProjectComponent } from "./page/project/project.component";
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "form", component: TaskFormComponent },
  { path: "project/:id", component: ProjectComponent },
  { path: "project", component: ProjectComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
