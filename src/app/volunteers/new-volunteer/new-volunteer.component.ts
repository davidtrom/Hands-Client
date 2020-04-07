import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Volunteer } from '../../models/Volunteer';


@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  volunteerForm: FormGroup;
  submitted : boolean = false;
  emailAlreadyTaken: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.volunteerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      link: ['']
    });
  }

  get form() { return this.volunteerForm.controls; }
  
  onSubmit(): void{
    this.loginService.checkVolunteerEmailAvailability(this.volunteerForm.controls.email.value).subscribe(
      data =>{
    
      if(data){
        
        let volunteer: Volunteer = new Volunteer(
          null,
          this.volunteerForm.controls.firstName.value,
          this.volunteerForm.controls.lastName.value,
          this.volunteerForm.controls.phoneNum.value,
          this.volunteerForm.controls.email.value,
          this.volunteerForm.controls.password.value,
          this.volunteerForm.controls.link.value
          );

        this.loginService.createVolunteer(volunteer).subscribe(
          data => {console.log("in component", data);
          console.log(this.volunteerForm.value);
          this.router.navigate(['/volunteer-login']);
          this.volunteerForm.reset();
          alert('You are now successfully registered! \nProceeding to Login...');
          }
        );
      }
      else{
        this.emailAlreadyTaken = true;
      }
    });  
  }
}
