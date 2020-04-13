import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Recipient } from 'src/app/models/Recipient';
import { RequestorLoginService } from 'src/app/requestor-login.service';

@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.css']
})
export class NewRecipientComponent implements OnInit {

  recipientForm: FormGroup;
  submitted: boolean = false;
  emailAlreadyTaken: boolean = false;

  constructor(private fb: FormBuilder, private requestorLoginService: RequestorLoginService, private router: Router) { }

  ngOnInit() {
    this.recipientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      location: ['', [Validators.required]],
      link: ['']
    });
  }

  get form() { return this.recipientForm.controls; }

  onSubmit(): void{
    this.submitted = true;
    
    this.requestorLoginService.checkRecipientEmailAvailability(this.recipientForm.controls.email.value).subscribe(
      data =>{
    
      if(data){
        
        let requestor: Recipient = new Recipient(
          null,
          this.recipientForm.controls.firstName.value,
          this.recipientForm.controls.lastName.value,
          this.recipientForm.controls.phoneNum.value,
          this.recipientForm.controls.email.value,
          this.recipientForm.controls.password.value,
          this.recipientForm.controls.location.value,
          this.recipientForm.controls.link.value
          );

        this.requestorLoginService.createRecipient(requestor).subscribe(
          data => {console.log("in component", data);
          console.log(this.recipientForm.value);
          this.router.navigate(['/requestor-login']);
          this.recipientForm.reset();
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
