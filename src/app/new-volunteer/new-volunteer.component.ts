import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {

  volunteerForm: FormGroup;
  submitted : boolean = false;
  emailAlreadyTaken: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router) { }

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
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.volunteerForm.invalid) {
      return;
  }
    console.log(this.volunteerForm.value);
    this.router.navigate(['/volunteer-login']);
    this.volunteerForm.reset();
    alert('You are now successfully registered!')
    
  }

}
