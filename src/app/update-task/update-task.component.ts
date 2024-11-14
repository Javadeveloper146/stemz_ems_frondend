import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
interface Task {
  id: number;
  event_type: string;
  start_time: string;
  end_time: string;
  task: string;
  total_duration: string | null;
  status: string;
  created_on: string;
  modified_on: string;
}
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent  implements OnInit{
  userTasks: any = {};
  errorMessage: string | null = null;
  minDate: Date;
  maxDate: Date;
  taskForm: FormGroup;
  today: Date;
  constructor(private http: HttpClient,private fb: FormBuilder) {


    this.maxDate = new Date(); // current date
    this.minDate = new Date();
    this.minDate.setDate(this.maxDate.getDate() - 7); 
  
  
  }

  ngOnInit(): void {

    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      eventType: ['', Validators.required],
      status: ['', Validators.required],
      taskDate: ['', Validators.required], 
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    });
    
    this.loadUserTasks();


  }

  loadUserTasks(): void {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (userData) {
      const userId = userData.id;
      this.http
        .get<any>(`http://127.0.0.1:8000/api/tasks/one-week-data/${userId}`)
        .subscribe(
          (data) => {
            this.userTasks = data.tasks || {};
            this.errorMessage = null;
          },
          (error) => {
            this.errorMessage = 'Failed to load tasks. Please try again later.';
          }
        );
    } else {
      this.errorMessage = 'No user data found.';
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      // this.getUserTasks();
      console.log('event.index',event.index)
    }
   

  }

  openModal() {
    // Open the modal using Bootstrap's JS
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Handle form submission
      console.log(this.taskForm.value);
      this.closeModal(); // Close the modal after submission
    }
  }
}