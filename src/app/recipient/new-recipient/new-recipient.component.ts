import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.css']
})
export class NewRecipientComponent implements OnInit {

  recipientForm: FormGroup;
  submitted: boolean = false;
  emailAlreadyTaken: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.recipientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      link: ['']
    });
  }

  get form() { return this.recipientForm.controls; }

  onSubmit(): void{
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.recipientForm.invalid) {
      return;
  }
    console.log(this.recipientForm.value);
    this.recipientForm.reset();
  }

}
