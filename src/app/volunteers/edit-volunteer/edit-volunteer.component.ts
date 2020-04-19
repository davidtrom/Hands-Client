import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Volunteer } from 'src/app/models/Volunteer';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.css']
})
export class EditVolunteerComponent implements OnInit {

  editVolunteerForm: FormGroup;
  volunteer$: Volunteer;
  isEmailAvailable: boolean = false;
  newEmail: string;
  

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.getCurrentVolunteer().subscribe(data => {this.volunteer$ = data});
    
    this.editVolunteerForm = this.fb.group({
      firstName: [this.volunteer$.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [this.volunteer$.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: [this.volunteer$.phoneNum, [Validators.required, Validators.minLength(10)]],
      email: [this.volunteer$.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%$!#+\-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$')]],
      link: [this.volunteer$.link]
    });

    
    //this.loopForm(this.editVolunteerForm);
    
    // this.onChanges();
    

  }

  // onChanges(){
  //   this.editVolunteerForm.get('email').valueChanges.subscribe(data => this.newEmail = data);

  // }

  // loopForm(group: FormGroup): void{
  //   Object.keys(group.controls).forEach((element: string) => {
  //     group.get(element);
      
  //   });
  // }

  get form() { return this.editVolunteerForm.controls; }

  onSubmitProfile(){
    console.log(this.volunteer$.email, " ", this.editVolunteerForm.controls.email.value);
    if(this.volunteer$.email != this.editVolunteerForm.controls.email.value){
      this.loginService.checkVolunteerEmailAvailability(this.editVolunteerForm.controls.email.value).subscribe(
        data => {this.isEmailAvailable = data;
          console.log("email available? ", this.isEmailAvailable);
          if(!this.isEmailAvailable){
              this.loginService.updateVolunteerProfile(this.volunteer$.id, this.editVolunteerForm.controls.firstName.value, this.editVolunteerForm.controls.lastName.value, this.editVolunteerForm.controls.phoneNum.value, this.editVolunteerForm.controls.email.value, this.editVolunteerForm.controls.link.value).subscribe(
                data => {console.log("in update component", data);
                  alert('Your profile has been successfully updated')
                  this.editVolunteerForm.reset();
                  this.router.navigate(['/view-profile']);
                }); 
          }
          else {
            this.isEmailAvailable = false;
          }
        });
    }
    else if (this.volunteer$.email === this.editVolunteerForm.controls.email.value){
        this.loginService.updateVolunteerProfile(this.volunteer$.id, this.editVolunteerForm.controls.firstName.value, this.editVolunteerForm.controls.lastName.value, this.editVolunteerForm.controls.phoneNum.value, this.editVolunteerForm.controls.email.value, this.editVolunteerForm.controls.link.value).subscribe(
          data => {console.log("in update component", data);
                if(data != null){
                  alert('Your profile has been successfully updated');
                  this.editVolunteerForm.reset();
                  this.router.navigate(['/view-profile']);
                }
                else{
                  alert('There was an error, please try again');
                }
              });
    }
  }
}
