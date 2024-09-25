import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private router: Router,private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const login = this.loginForm.value; // Get form values
      console.log('Login Data:', login);

      this.http.post('http://127.0.0.1:8000/login', login).subscribe(
        (data: any) => {
          console.log('Data:', data);
          localStorage.setItem('userData', JSON.stringify(data));
          const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          console.log('User Name:', userData.username);
        }
          this.snackBar.open('Successfully logged in : ' + data.username, 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.router.navigate(['/task']); // Navigate to the desired route
        },
        error => {
          console.error('Login failed:', error);
          this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
        }
      );
    }
  }
}


// localStorage.removeItem('userData');
// // or to clear all local storage
// localStorage.clear();