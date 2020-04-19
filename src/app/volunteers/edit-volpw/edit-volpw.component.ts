import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Volunteer } from 'src/app/models/Volunteer';

@Component({
  selector: 'app-edit-volpw',
  templateUrl: './edit-volpw.component.html',
  styleUrls: ['./edit-volpw.component.css']
})
export class EditVolpwComponent implements OnInit {

  editVolunteerPWForm: FormGroup;
  volunteer$: Volunteer;
  
  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    //this.loginService.currentVolunteer$.subscribe(data => this.volunteer$ = data);

    this.editVolunteerPWForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]]
    });
  }

  get form() { return this.editVolunteerPWForm.controls; }

  // updatePassword(this.editVolunteerPWForm.controls.currentPassword.value){

  // }
}
