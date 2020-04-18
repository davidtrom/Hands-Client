import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { RecipientService } from 'src/app/services/recipient.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  volIsLoggedIn: boolean;
  recipIsLoggedIn: boolean;

  constructor(private loginService: LoginService, private recipientService: RecipientService) { }

  ngOnInit() {
    this.loginService.getLoggedInStatus().subscribe(data => this.volIsLoggedIn = data);
    console.log("Vol Logged In: ", this.volIsLoggedIn)
    this.recipientService.getLoggedInStatus().subscribe(data => this.recipIsLoggedIn = data);
    console.log("Recip Logged In: ", this.recipIsLoggedIn)
  }

  ngOnDestroy(){


  }

  logout(){
    this.loginService.updateLoggedInStatus(false);
    this.recipientService.updateLoggedInStatus(false);
    // if(this.currentVolunteer != null){
    //   this.loginService.updateCurrentVolunteer(null);
    // }
    // else {
    // this.recipientService.updateCurrentRecipient(null);
    // }
  }

}
