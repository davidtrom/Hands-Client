import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Volunteer } from '../models/Volunteer';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Recipient } from '../models/Recipient';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  volunteer: Volunteer;
  recipient: Recipient;
  isLoggedIn$: BehaviorSubject<any> = new BehaviorSubject([]);
  currentVolunteer$: BehaviorSubject<any> = new BehaviorSubject([]);
  currentRecipient$: BehaviorSubject<any> = new BehaviorSubject([]);

  
  isVolunteerEmailAvailable: boolean;
  isRecipientEmailAvailable: boolean;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }


  constructor(private http: HttpClient) { }

  updateCurrentVolunteer(volunteer : Volunteer) {
    console.log("user update in service", volunteer);
    this.currentVolunteer$.next(volunteer);
  }

  updateCurrentRecipient(recipient : Recipient) {
    console.log("user update in service", recipient);
    this.currentRecipient$.next(recipient);
  }

  updateLoggedInStatus(isLoggedIn : Boolean) {
    console.log("user update in service", isLoggedIn);
    this.isLoggedIn$.next(isLoggedIn);
  }

  checkVolunteerEmailAvailability(email: string): Observable<boolean> {
    console.log("inside service check email")
    let reqData: Object = {"email": email};
    return this.http.post<boolean>(this.baseUrl+"/volunteers/check-email", reqData, this.httpOptions);
      //.pipe(tap(data => this.isVolunteerEmailAvailable = data));
  }

  checkRecipientEmailAvailability(email: string): Observable<boolean> {
    //let reqData: Object = {"email": email};
    return this.http.post<boolean>(this.baseUrl+"/volunteers/check-email", email, this.httpOptions);
      //.pipe(tap(data => console.log(data)));
  }

  createVolunteer(volunteerToCreate:Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.baseUrl+"/volunteers/create", volunteerToCreate, this.httpOptions)
      .pipe(tap(data => {console.log("volunteer created");}), 
      catchError(this.handleError<Volunteer>('create volunteer', null))
    )
  }

  verifyVolunteer(email:string, password:string) : Observable<Volunteer>{
    let reqData: Object = {"email": email, "password": password};
    return this.http.post<Volunteer>(this.baseUrl+"/volunteers/verify", reqData, this.httpOptions)
      .pipe(tap(data => {this.volunteer = data;
        if(!this.volunteer==null){
          this.isLoggedIn$.next(true);
        }
      }),
      catchError(this.handleError<Volunteer>('verification', null))
    )
    
  }

  verifyRecipient(email:string, password:string) : Observable<Volunteer>{
    let reqData: Object = {"email": email, "password": password};
    return this.http.post<Volunteer>(this.baseUrl+"/volunteers/verify", reqData, this.httpOptions)
      .pipe(tap(data => {console.log(data);}),
      catchError(this.handleError<Volunteer>('verification', null))
    )
  }





  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
