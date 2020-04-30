import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Volunteer } from '../models/Volunteer';

@Component({
  selector: 'app-update-vol-email',
  templateUrl: './update-vol-email.component.html',
  styleUrls: ['./update-vol-email.component.css']
})
export class UpdateVolEmailComponent implements OnInit {
  editVolunteerEmailForm: FormGroup;
  volunteer$: Volunteer;
  emailAvailable: boolean;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {


    this.editVolunteerEmailForm = this.fb.group({
      currentEmail: [this.volunteer$.email, [Validators.required]],
      newEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]]
    })
  }

  get form() {return this.editVolunteerEmailForm.controls;}

  onSubmit(){
    
    this.loginService.checkVolunteerEmailAvailability(this.editVolunteerEmailForm.controls.newEmail.value).subscribe(data=> {this.emailAvailable = data;
    if(data){
      this.loginService.updateVolunteerEMail(this.editVolunteerEmailForm.controls.currentEmail.value, this.editVolunteerEmailForm.controls.newEmail.value).subscribe(data => console.log(data));
      alert('Your username/email address have been updated.');
      location.reload();
    }
    else{
      alert('This username/email is already taken. \n Please try again.');
    }
    })

  }
}
