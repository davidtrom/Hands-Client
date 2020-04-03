import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-volunteer-login',
  templateUrl: './volunteer-login.component.html',
  styleUrls: ['./volunteer-login.component.css']
})
export class VolunteerLoginComponent implements OnInit {

  loginForm: FormGroup;
  volEmail: string;
  volPassword: string;
  
  constructor(private router: Router) {
    this.loginForm = this.createFormGroup();
   }

  ngOnInit() { }

    createFormGroup() { 
      return new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required])
    });
    }
  

  onSubmit()  {
    this.volEmail = this.loginForm.controls.email.value;
    this.volPassword = this.loginForm.controls.password.value;
     console.log(this.volEmail);
     console.log(this.volPassword);
  }

}



  

  