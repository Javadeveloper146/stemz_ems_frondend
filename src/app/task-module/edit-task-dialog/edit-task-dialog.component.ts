import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModuleComponent } from '../task-module.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  
  ) {
    this.taskForm = this.fb.group({
      eventType: [data.event_type],
      task: [data.task],
      status: [data.status],
      start_time: [data.start_time],
      end_time: [data.end_time],
    });
  }


  onSubmit(): void {
    
    // Handle the form submission
    const updatedTask = this.taskForm.value;
    // this.dialogRef.close(updatedTask);
    console.log('Updated Task:', updatedTask);
    this.http.put(`http://127.0.0.1:8000/api/update-task/${this.data.id}`, updatedTask)
  
    .subscribe({
      next: (response) => {

        this.dialogRef.close(updatedTask); // Pass updated task to the parent component
      
        
      },
      error: (error) => {
        console.error('Error updating task:', error);
      },
    });
    this.dialogRef.close();
  }


  

}
