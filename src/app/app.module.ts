import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { TaskModuleComponent } from './task-module/task-module.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { EditTaskDialogComponent } from './task-module/edit-task-dialog/edit-task-dialog.component';
import { MonthWiseReportComponent } from './task-module/month-wise-report/month-wise-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskModuleComponent,
    EditTaskDialogComponent,
    MonthWiseReportComponent,
    
  
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    MatTabsModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,

    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
