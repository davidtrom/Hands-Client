import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Volunteer } from 'src/app/models/Volunteer';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.css']
})
export class EditVolunteerComponent implements OnInit {

  editVolunteerForm: FormGroup;
  //editVolunteerLoginForm: FormGroup;
  volunteer$: Volunteer;
  isEmailAvailable: boolean;
  

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.currentVolunteer$.subscribe(data => {this.volunteer$ = data});
    
    this.editVolunteerForm = this.fb.group({
      firstName: [this.volunteer$.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [this.volunteer$.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: [this.volunteer$.phoneNum, [Validators.required, Validators.minLength(10)]],
      email: [this.volunteer$.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      // password: [this.volunteer$.password, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      link: [this.volunteer$.link]
    });

  }

  get form() { return this.editVolunteerForm.controls; }

  onSubmitProfile(){
    if(this.editVolunteerForm.controls.email.touched && this.editVolunteerForm.controls.dirty){
      this.loginService.checkVolunteerEmailAvailability(this.editVolunteerForm.controls.email.value).subscribe(
        data => {this.isEmailAvailable = data;
          if(this.isEmailAvailable){
              this.loginService.updateVolunteerProfile(this.volunteer$.id, this.editVolunteerForm.controls.firstName.value, this.editVolunteerForm.controls.lastName.value, this.editVolunteerForm.controls.phoneNum.value, this.editVolunteerForm.controls.email.value, this.editVolunteerForm.controls.link.value).subscribe(
                data => {console.log("in update component", data);
                if(data != null){
                  alert('Your profile has been successfully updated')
                  this.editVolunteerForm.reset();
                  this.router.navigate(['/view-profile'])
                }
                else{
                  alert('There was an error, please try again');
                }
                }); 
          }
          else{
            this.isEmailAvailable = false;
          }
        });
    }
    else{
        console.log(this.editVolunteerForm)
        this.loginService.updateVolunteerProfile(this.volunteer$.id, this.editVolunteerForm.controls.firstName.value, this.editVolunteerForm.controls.lastName.value, this.editVolunteerForm.controls.phoneNum.value, this.editVolunteerForm.controls.email.value, this.editVolunteerForm.controls.link.value).subscribe(
          data => {console.log("in update component", data);
                if(data != null){
                  alert('Your profile has been successfully updated')
                  this.editVolunteerForm.reset();
                }
                else{
                  alert('There was an error, please try again');
                }
              });
    }
  }
}
