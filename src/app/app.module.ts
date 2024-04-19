import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./page/home/home.component";
import { AboutComponent } from "./page/about/about.component";
import { ContactComponent } from "./page/contact/contact.component";
import { ButtonComponent } from "./lib/button/button.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListComponent } from "./lib/list/list.component";
import { SortableModule } from "ngx-bootstrap/sortable";
import { TaskFormComponent } from "./lib/task-form/task-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TaskService} from "./service/task.service";
import { HttpClientModule } from "@angular/common/http";
import { NavComponent } from './lib/nav/nav.component';
import { ProjectComponent} from "./page/project/project.component";
import { UserComponent } from './page/user/user.component';
import { LoginComponent } from './page/user/login/login.component';
import { SignupComponent } from './page/user/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ButtonComponent,
    ListComponent,
    TaskFormComponent,
    NavComponent,
    ProjectComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SortableModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
