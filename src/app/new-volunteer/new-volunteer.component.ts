import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  volunteerForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.volunteerForm = this.fb.group({
      firstName: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      lastName: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      phoneNum: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')],
      password: ['', Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')],
      link: ['']
    });
  }

  get email() {
    return this.volunteerForm.get('email');
  } 

  // Validators.minLength, Validators.maxLength
  // this.volunteerForm = new FormGroup({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   phoneNum: new FormControl(),
  //   email: new FormControl(),
  //   password: new FormControl(),
  //   link: new FormControl(),
  // });
  
  onSubmit(): void{
    console.log(this.volunteerForm.value);
    this.volunteerForm.reset();
  }

}
