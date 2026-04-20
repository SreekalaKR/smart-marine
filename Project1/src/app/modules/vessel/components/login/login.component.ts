import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VslVesselService } from 'src/app/services/tables/vsl_vessel/vsl-vessel.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {
    Username: '',
    Password: ''
  };
  showPassword: boolean = false; // Added to control password visibility

  constructor(private router: Router, private vslVesselService: VslVesselService,) {
  }

  onSubmit() {

    this.vslVesselService.login(this.loginForm).subscribe(
      (response) => {
        // Handle successful login, e.g., store the token and navigate to a protected route.
        console.log('Login successful', response);
        // Assuming you have a token, you can store it in localStorage or a cookie.
        // localStorage.setItem('token', response.token);
        this.router.navigateByUrl('vessel/vessel-list');
      },
      (error) => {
        // Handle login error, e.g., display an error message to the user.
        console.error('Login error', error);
        Swal.fire("Login failed", "Invalid username or password", "error");
      }
    );
  }


  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
