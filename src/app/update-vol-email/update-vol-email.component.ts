import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Volunteer } from '../models/Volunteer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-vol-email',
  templateUrl: './update-vol-email.component.html',
  styleUrls: ['./update-vol-email.component.css']
})
export class UpdateVolEmailComponent implements OnInit {
  editVolEmail: FormGroup;
  volunteer$: Volunteer;
  emailTaken: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService, private fb: FormBuilder) {
    // let id = +this.route.snapshot.paramMap.get('id');
    //  this.loginService.getVolunteerById(id);
     
   }

  ngOnInit() {
    //  let id = +this.route.snapshot.paramMap.get('id');
    //  this.loginService.getVolunteerById(id);
    //   this.loginService.getCurrentVolunteer().subscribe(data => this.volunteer$ = data);
    // console.log(this.volunteer$);

    this.editVolEmail = this.fb.group({
      newEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]]
    });

    this.loginService.getCurrentVolunteer().subscribe(data => this.volunteer$ = data);
    console.log(this.volunteer$);
  }

  get email() {
    return this.editVolEmail.get('email');
  } 

  onSubmit(){
    this.loginService.checkVolunteerEmailAvailability(this.editVolEmail.controls.newEmail.value).subscribe(data=> {this.emailTaken = data;
      console.log(data);
      if(data){
        this.emailTaken = true;
      }
      else{
      this.loginService.updateVolunteerEmail(this.volunteer$.email, this.editVolEmail.controls.newEmail.value).subscribe(data =>{
        console.log(data);
      } );
      alert('Your username/email address have been updated.');
      this.editVolEmail.reset();
      }
    });
  }
}
