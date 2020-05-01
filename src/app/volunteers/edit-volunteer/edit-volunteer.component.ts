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
  isEmailAvailable: boolean;
  newEmail: string;
  isEmailDifferent: boolean;
  

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.getCurrentVolunteer().subscribe(data => {this.volunteer$ = data});
    
    this.editVolunteerForm = this.fb.group({
      firstName: [this.volunteer$.firstName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [this.volunteer$.lastName, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      phoneNum: [this.volunteer$.phoneNum, [Validators.required, Validators.minLength(10)]],
      link: [this.volunteer$.link]
    });

    //this.loopForm(this.editVolunteerForm);
    
    // this.onChanges();
  }

  ngOnDestroy(){
    
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
      this.loginService.updateVolunteerProfile(this.volunteer$.id, this.editVolunteerForm.controls.firstName.value, this.editVolunteerForm.controls.lastName.value, this.editVolunteerForm.controls.phoneNum.value, this.editVolunteerForm.controls.link.value).subscribe(
          data => {console.log("updating volunteer", data);
                if(data !== null){
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
