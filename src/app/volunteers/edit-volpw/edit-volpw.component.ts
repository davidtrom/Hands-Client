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
  volunteer$: Volunteer;
  passwordsDontMatch: boolean;
  passwordUpdated: boolean;
  
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.editVolunteerPWForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_.@$%^&*-]).{8,}$')]]
    });
    
    // let id = +this.route.snapshot.paramMap.get('id');
    // console.log(id);
    // this.loginService.getVolunteerById(id).subscribe(idData => {console.log("getting vol");
    // this.volunteer$ = idData});
    this.loginService.getCurrentVolunteer().subscribe(data => this.volunteer$ = data);
    console.log(this.volunteer$);
    console.log(this.volunteer$.id);
    
    
  }

  get form() { return this.editVolunteerPWForm.controls; }

  // checkPasswordsMatch(currentPassword: string, newPassword: string): boolean{
  //   if 
  // }

  onSubmit(){
    if(this.editVolunteerPWForm.controls.newPassword.value !== this.editVolunteerPWForm.controls.currentPassword.value){
      this.passwordsDontMatch = true;
    }
    else if (this.editVolunteerPWForm.controls.newPassword.value === this.editVolunteerPWForm.controls.currentPassword.value) {
      this.loginService.updatePassword(this.volunteer$.id, this.editVolunteerPWForm.controls.currentPassword.value, this.editVolunteerPWForm.controls.newPassword.value)
        .subscribe(data => {console.log("password updated");
        this.passwordUpdated = data;
        if(this.passwordUpdated === true){
          alert('Your password has been updated.')
          this.editVolunteerPWForm.reset();
        }
        else{
          alert('There was an error. \nPlease try again.')
        }
      });
    }
  }
}

  
  // updatePassword(this.editVolunteerPWForm.controls.currentPassword.value){

  // }

