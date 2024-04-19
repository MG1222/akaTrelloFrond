import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./page/about/about.component";
import { HomeComponent } from "./page/home/home.component";
import { ContactComponent } from "./page/contact/contact.component";
import { TaskFormComponent } from "./lib/task-form/task-form.component";
import {ProjectComponent} from "./page/project/project.component";
import {LoginComponent} from "./page/user/login/login.component";
import {SignupComponent} from "./page/user/signup/signup.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "project",component: ProjectComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "form", component: TaskFormComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
