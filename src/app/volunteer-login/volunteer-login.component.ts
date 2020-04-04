import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-volunteer-login',
  templateUrl: './volunteer-login.component.html',
  styleUrls: ['./volunteer-login.component.css']
})
export class VolunteerLoginComponent implements OnInit {

  volLoginForm: FormGroup;
  email: string;
  password: string;
  invalidLogin: boolean = false;
  
  constructor(private router: Router, private loginService: LoginService) {
    this.volLoginForm = this.createFormGroup();
   }

  ngOnInit() { }

    createFormGroup() { 
      return new FormGroup({
          volEmail: new FormControl('', [Validators.required]),
          volPassword: new FormControl('', [Validators.required])
    });
    }

    get volEmail(){
      return this.volLoginForm.get('volEmail');
    }

    get volPassword(){
      return this.volLoginForm.get('volEmail');
    }

  onSubmit()  {
    this.email = this.volLoginForm.controls.volEmail.value;
    this.password = this.volLoginForm.controls.volPassword.value;
     console.log(this.volLoginForm);
    //  console.log(this.volPassword);
    this.router.navigate(['/display-requests']);
  }

}



  

  