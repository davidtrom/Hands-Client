import { Component, OnInit } from '@angular/core';
import { Recipient } from 'src/app/models/Recipient';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RequestorLoginService } from 'src/app/services/requestor-login.service';
import { RecipientService } from 'src/app/services/recipient.service';

@Component({
  selector: 'app-recipient-login',
  templateUrl: './recipient-login.component.html',
  styleUrls: ['./recipient-login.component.css']
})
export class RecipientLoginComponent implements OnInit {

  recipLoginForm: FormGroup;
  invalidLogin: boolean = false;
  recipient$: Recipient;
  volunteerIsLoggedIn: boolean;

  constructor(private router: Router, private recipientService: RecipientService, private fb: FormBuilder) { }

  ngOnInit() {
    this.recipLoginForm = this.fb.group({
      recipEmail: [''],
      recipPassword: ['']
    });
  }

  get form() { return this.recipLoginForm.controls; }

  onSubmit() {
    console.log("Inside submit", this.recipLoginForm.value)
    this.recipientService.verifyRecipient(this.recipLoginForm.controls.recipEmail.value, this.recipLoginForm.controls.recipPassword.value)
      .subscribe(data => {
        if(data == null){
          this.invalidLogin = true;
          this.recipLoginForm.reset();
        }
        else {
          this.recipient$ = data;
          console.log("Login Successful ", data);
          //this.recipientService.updateCurrentRecipient(data);
          //this.recipientService.updateLoggedInStatus(true);
          this.router.navigate(['/req-requests', this.recipient$.id]);
          //[routerLink]="['/request-detail', helpRequest.id]"
        }
      })
  }
}
