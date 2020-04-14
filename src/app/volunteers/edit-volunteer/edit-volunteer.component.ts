import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Volunteer } from 'src/app/models/Volunteer';
import { LoginService } from 'src/app/services/login.service';

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
  

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

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

  onSubmitLogin(){
    this.loginService.checkVolunteerEmailAvailability(this.editVolunteerForm.controls.email.value).subscribe(
      data => {this.isEmailAvailable = data;
        if(this.isEmailAvailable){
          

          

          
        }
    })
  }

}
