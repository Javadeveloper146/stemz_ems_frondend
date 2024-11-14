import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { HeaderComponentComponent } from './header-component/header-component.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { MatButtonModule } from '@angular/material/button';
import { UserBasedTaskComponent } from './task-module/user-based-task/user-based-task.component';
import { AllocateTaskComponent } from './allocate-task/allocate-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskModuleComponent,
    EditTaskDialogComponent,
    MonthWiseReportComponent,
    HeaderComponentComponent,
    UserBasedTaskComponent,
    AllocateTaskComponent,
    UpdateTaskComponent,
    ChatComponent,
    
  
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    NgxMaterialTimepickerModule,
    MatTabsModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
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
