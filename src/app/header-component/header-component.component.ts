import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare global {
  interface Window {
    bootstrap: any; // Declare bootstrap to avoid TypeScript errors
  }
}
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent  implements OnInit{
  username:any;
  role:any;
  ngOnInit(): void {
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;

    this.username = userData.username;
    this.role =userData.role;
    console.log("id",this.username)
  }
  constructor(private router: Router,private http: HttpClient) {}

  // confirmLogout(): void {
  //   const confirmed = window.confirm('Are you sure you want to logout?');
  //   if (confirmed) {
  //     // Perform the logout action, such as clearing user data and redirecting to the login page
  //     localStorage.removeItem('userData'); // Example of clearing user data from local storage
  //     this.router.navigate(['/login']); // Redirect to the login page
  //   }
  // }



  grievance = {
    subject: '',
    description: ''
  };



  submitGrievance(): void {
    // API endpoint where the grievance will be submitted
    const apiEndpoint = 'http://127.0.0.1:8000/api/grievances';

    // Send the grievance to the backend
    this.http.post(apiEndpoint, this.grievance).subscribe(
      (response) => {
        alert('Grievance submitted successfully!');
        // Reset the form
        this.grievance = { subject: '', description: '' };
      },
      (error) => {
        alert('Failed to submit grievance. Please try again later.');
      }
    );
  }

  notifications: { message: string, time: string }[] = [];
  getNotifications(): void {
    // Example: Fetching notifications from an API
    const apiEndpoint = 'http://127.0.0.1:8000/api/notifications'; // Update with your endpoint

    this.http.get<any[]>(apiEndpoint).subscribe(
      (response) => {
        this.notifications = response; // Assuming the API returns a list of notifications
      },
      (error) => {
        console.error('Failed to load notifications', error);
      }
    );
  }

  isModalOpen = false;
  openModal() {
    
  }


  logout() {
    // Logic for logout action
    console.log("Logging out...");
    this.router.navigate(['/login']);
    // You can add your logout logic here like clearing session storage or navigating to the login page.
  }
 


}
