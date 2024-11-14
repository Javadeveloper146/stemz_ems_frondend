import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TaskModuleComponent } from './task-module/task-module.component';
import { AllocateTaskComponent } from './allocate-task/allocate-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TaskModuleComponent },
  { path: 'allocate_task', component: AllocateTaskComponent },
  { path: 'update_task', component: UpdateTaskComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
