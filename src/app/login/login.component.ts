import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  loginSuccess: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    // Simulate a successful login for demonstration purposes.
    if (this.username === 'test' && this.password === 'test') {
      // Show a success message or alert
      console.log('Login successful');
      this.loginSuccess = true;
      this.loginError = false;

      // Delay the navigation for 5 seconds
      setTimeout(() => {
        // Navigate to the home page after 5 seconds
        this.router.navigate(['/home']);
      }, 3000);
    } else {
      // Display an error message
      console.error('Login failed');
      this.loginError = true;
    }
  }
}
