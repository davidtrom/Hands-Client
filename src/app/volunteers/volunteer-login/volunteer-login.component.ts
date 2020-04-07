import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Volunteer } from '../../models/Volunteer';

@Component({
  selector: 'app-volunteer-login',
  templateUrl: './volunteer-login.component.html',
  styleUrls: ['./volunteer-login.component.css']
})
export class VolunteerLoginComponent implements OnInit {

  volLoginForm: FormGroup;
  invalidLogin: boolean = false;
  volunteer: Volunteer;
  volunteerIsLoggedIn: boolean;
  
  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder) {
   }

  ngOnInit() { 
    this.volLoginForm = this.fb.group({
      volEmail: [''],
      volPassword: ['']
    });
  }

  get form() { return this.volLoginForm.controls; }

  onSubmit() {
    console.log("Inside submit")
    this.loginService.verifyVolunteer(this.volLoginForm.controls.volEmail.value, this.volLoginForm.controls.volPassword.value)
      .subscribe(data => {
        if(data == null){
          this.invalidLogin = true;
          this.volLoginForm.reset();
        }
        else {
          console.log("Login Successful");
          this.volunteer = this.loginService.volunteer;
          this.volunteerIsLoggedIn = this.loginService.isLoggedIn;
          this.router.navigate(['/display-requests']);
        }
      })
  }

}



  

  