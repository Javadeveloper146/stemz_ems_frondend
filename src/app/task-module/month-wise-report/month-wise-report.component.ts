import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-month-wise-report',
  templateUrl: './month-wise-report.component.html',
  styleUrls: ['./month-wise-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthWiseReportComponent implements OnInit{
  monthWiseReports: any[] = [];
  dates: string[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
   
  }
}