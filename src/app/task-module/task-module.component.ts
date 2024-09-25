import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-module',
  templateUrl: './task-module.component.html',
  styleUrls: ['./task-module.component.scss']
})
export class TaskModuleComponent {
  tasks: any[] = [];
  taskForm: FormGroup;
  monthWiseReports: any[] = [];
  dates: string[] = [];
  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    
  ) {
    this.taskForm = this.fb.group({
      eventType: ['', Validators.required],
      task: ['', Validators.required],
      status: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    console.log('User Name:', userDataString);
    const userData = JSON.parse(userDataString);
    console.log('User Name:', userData.username);
   
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Task Data:', taskData);
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
   
      // Add username to taskData if userData is available
      if (userData) {
        taskData.user_id = userData.id;
      }

         
      this.http.post('http://127.0.0.1:8000/api/tasks', taskData).subscribe(
        (data: any) => {
          console.log('Task entry created:', data);
          this.snackBar.open('Task created successfully!', 'Close', {
            duration: 3000,
          });
          this.taskForm.reset();
          this.router.navigate(['/task']);
        },
        error => {
          console.error('Error creating task entry:', error);
          this.snackBar.open('Error creating task entry. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
  clear(){
    this.taskForm.reset();
  }
  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getUserTasks();
      console.log('event.index',event.index)
    }
    if (event.index === 2) {
      console.log('event.index',event.index)
      this.monthWise_report()
    }
    if (event.index === 3) {
      console.log('event.index',event.index)
      this.month_wise_overall_efficiency()
    }

  }

  getUserTasks() {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const user_id = userData.id;
    this.http
      .get(`http://127.0.0.1:8000/api/tasks-user/${user_id}`)
      .subscribe((response: any) => {
        this.tasks = response.tasks; 
        console.log("sdgjsd",this.tasks)
        this.monthWise_report()
      });
  }

  convertDuration(totalDuration: string): string {
    const [hours, minutes] = totalDuration.split(':').map(Number);
    let durationString = '';
  
    if (hours > 0) {
      durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      if (durationString) durationString += ' and ';
      durationString += `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  
    return durationString || '0 mins';
  }


  openEditModal(task: any): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '600px',
      data: { ...task, id: task.id }, // Ensure id is included
  }

);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Task Updated successfully!', 'Close', {
        });
       
      }

      this.getUserTasks();
    });
}

deleteTask(taskId: number): void {
  if (confirm("Are you sure you want to delete this task?")) {
    this.http.delete(`http://127.0.0.1:8000/api/delete-task/${taskId}`).subscribe(
      response => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        console.log('Task deleted successfully');
      },
      error => {
        console.error('Error deleting task:', error);
      }
    );
  }
}

convertToDate(timeString: string): Date {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

monthWise_report(){
  this.http.get('http://127.0.0.1:8000/api/task-duration').subscribe(
    (response: any) => {
      this.monthWiseReports = response.month_wise_reports;
      console.log('Month-wise Reports:', this.monthWiseReports);

      // Log the month for each report
      this.monthWiseReports.forEach((report) => {
        console.log('Month:', report.month);
      });

      // Extract unique dates from all reports
      this.dates = this.extractDates(this.monthWiseReports);
      console.log('Extracted Dates:', this.dates);

      // Precompute user entries for each day in the report
      this.monthWiseReports.forEach((report) => {
        report.data.forEach((day) => {
          day.computedEntries = this.computeUserEntries(day);
        });
      });
    },
    (error) => {
      console.error('Error fetching task duration data:', error);
    }
  );
}

// Extracts all unique dates from month-wise reports
extractDates(monthReports: any[]): string[] {
  const datesSet = new Set<string>();
  monthReports.forEach((report) => {
    report.data.forEach((day: any) => {
      datesSet.add(day.date);
    });
  });
  return Array.from(datesSet).sort();
}

// Compute user entries for each day (preprocessing the data)
computeUserEntries(day: any) {
  return Object.keys(day.entries).map((userId) => {
    return {
      username: day.entries[userId].username,
      total_duration: day.entries[userId].total_duration || 'No entries',
    };
  });
}

// Utility method to check if a given date belongs to a specific month
isInMonth(date: string, month: string): boolean {
  const dateObj = new Date(date);
  const monthName = dateObj.toLocaleString('default', { month: 'long' });
  return monthName.toLowerCase() === month.toLowerCase();
}


// Over All efficiency 
private apiUrl = 'http://127.0.0.1:8000/api/month-wise-total-duration/';
loading: boolean = true;
error: string | null = null;
monthWiseUserPercentage: { [key: string]: { [key: string]: number } } = {};


month_wise_overall_efficiency() {
  this.http.get<{ month_wise_user_percentage: any }>(this.apiUrl).subscribe({
    next: (data) => {
      this.monthWiseUserPercentage = data.month_wise_user_percentage || {};
      this.loading = false;
      console.log('Month-wise User Percentage:', this.monthWiseUserPercentage);
    },
    error: (err) => {
      this.error = 'Error fetching month-wise user percentage';
      console.error('Error:', err);
    }
  });
}

getMonths(): string[] {
  return Object.keys(this.monthWiseUserPercentage);
}

getUserPercentage(month: string, user: string): number | null {
  return this.monthWiseUserPercentage[month]?.[user] || null;
}

getUniqueUsers(): string[] {
  const users = new Set<string>();
  Object.values(this.monthWiseUserPercentage).forEach(monthData => {
    Object.keys(monthData).forEach(user => {
      users.add(user);
    });
  });
  return Array.from(users);
}

}

