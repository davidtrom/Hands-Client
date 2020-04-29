import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-volpw',
  templateUrl: './edit-volpw.component.html',
  styleUrls: ['./edit-volpw.component.css']
})
export class EditVolpwComponent implements OnInit {

  editVolunteerPWForm: FormGroup;
  editVolunteerEmailForm: FormGroup;
  volunteer$: Volunteer;
  passwordsMatch: boolean;
  emailAvailable: boolean;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.loginService.getVolunteerById(id).subscribe(idData => {console.log("getting vol");});
    this.loginService.getCurrentVolunteer().subscribe(data => this.volunteer$ = data);
    console.log(this.volunteer$);
    this.editVolunteerPWForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]]
    });

    this.editVolunteerEmailForm = this.fb.group({
      currentEmail: [this.volunteer$.email, [Validators.required]],
      newEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]]
    })


  }

  get volPWForm() { return this.editVolunteerPWForm.controls; }

  get volEmailForm() {return this.editVolunteerEmailForm.controls;}

  submitPW(){

  }

  submitEmail(){
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
  // updatePassword(this.editVolunteerPWForm.controls.currentPassword.value){

  // }
}
