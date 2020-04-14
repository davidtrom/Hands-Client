import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-volpw',
  templateUrl: './edit-volpw.component.html',
  styleUrls: ['./edit-volpw.component.css']
})
export class EditVolpwComponent implements OnInit {

  editVolunteerPWForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.editVolunteerPWForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]]
    });
  }

  get form() { return this.editVolunteerPWForm.controls; }
}
