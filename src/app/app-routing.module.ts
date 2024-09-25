import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TaskModuleComponent } from './task-module/task-module.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TaskModuleComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
