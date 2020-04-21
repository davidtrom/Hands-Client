import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Volunteer } from '../models/Volunteer';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HelpRequest } from '../models/helpRequest';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  volunteer: Volunteer;
  private loggedInStatus = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  private isLoggedIn$: BehaviorSubject<boolean>;
  private currentVolunteer$: BehaviorSubject<Volunteer>;
  isVolunteerEmailAvailable: boolean;
  

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }


  constructor(private http: HttpClient) { 
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.currentVolunteer$ = new BehaviorSubject<Volunteer>(null);
  }

  get isLoggedIn(){
    return JSON.parse(sessionStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  updateCurrentVolunteer(volunteer : Volunteer) {
    console.log("volunteer update in service", volunteer);
    this.currentVolunteer$.next(volunteer);
  }

  updateLoggedInStatus(isLoggedIn : boolean) {
    console.log("volunteer logged in", isLoggedIn);
    this.isLoggedIn$.next(isLoggedIn);
  }

  getCurrentVolunteer(): Observable<Volunteer> {
    //this.getVolunteerByEmail().subscribe(data => console.log("retrieving volunteer"));
    // var email = sessionStorage.getItem('username');
    // console.log("email: ", email);
    // return this.http.get<Volunteer>(this.baseUrl + "/volunteers/get-by-email/" +email, this.httpOptions)
    // .pipe(tap(data => {this.currentVolunteer$.next(data);
      
    // }),
    // catchError(this.handleError<Volunteer>('error getting volunteer by Email', null)))
    return this.currentVolunteer$.asObservable();
  }

  // getLoggedInStatus(): Observable<boolean> {
  //   return this.isLoggedIn$.asObservable();
  // }

  getLoggedInStatus(): Observable<boolean>{
    let checkLogin: string;
    checkLogin = sessionStorage.getItem('isLoggedIn');
    if (checkLogin === 'true'){
      this.isLoggedIn$.next(true);
    }
    return this.isLoggedIn$.asObservable();
  }

  checkVolunteerEmailAvailability(email: string): Observable<boolean> {
    console.log("inside service check email")
    let reqData: Object = {"email": email};
    return this.http.post<boolean>(this.baseUrl+"/volunteers/check-email", reqData, this.httpOptions)
      .pipe(tap(data => {this.isVolunteerEmailAvailable = data;
        console.log(data);}),
        catchError(this.handleError<boolean>('error while checking email availability status', null)));
  }

  createVolunteer(volunteerToCreate:Volunteer): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.baseUrl+"/volunteers/create", volunteerToCreate, this.httpOptions)
      .pipe(tap(data => {console.log("volunteer created");}), 
      catchError(this.handleError<Volunteer>('error creating volunteer', null))
    )
  }

  updateVolunteerProfile(id: number, firstName:string, lastName: string, phoneNum: string, email: string, link: string): Observable<Volunteer> {
    let reqData: Object = {"id": id, "firstName": firstName, "lastName": lastName, "phoneNum": phoneNum, "email": email, "link": link}
    return this.http.post<Volunteer>(this.baseUrl + "/volunteers/update-profile", reqData, this.httpOptions)
      .pipe(tap(data => {console.log("volunteer updating", data);
        this.currentVolunteer$.next(data);}),
      catchError(this.handleError<Volunteer>('error updating', null))
      )
  }

  verifyVolunteer(email:string, password:string) : Observable<Volunteer>{
    let reqData: Object = {"email": email, "password": password};
    return this.http.post<Volunteer>(this.baseUrl+"/volunteers/verify", reqData, this.httpOptions)
      .pipe(tap(data => {this.volunteer = data;
        if(this.volunteer != null){
          this.isLoggedIn$.next(true);
          this.currentVolunteer$.next(data);
          sessionStorage.setItem('username', email);
          sessionStorage.setItem('isLoggedIn', 'true')
        }
      }),
      catchError(this.handleError<Volunteer>('verification', null))
    )
  }

  getVolunteerById(id:number) : Observable<Volunteer>{
    return this.http.get<Volunteer>(this.baseUrl + "/volunteers/get/" +id, this.httpOptions)
    .pipe(tap(data => {this.currentVolunteer$.next(data);}),
    catchError(this.handleError<Volunteer>('error getting volunteer by Id', null)))
  }

  getVolunteerByEmail(email:string) : Observable<Volunteer>{
    return this.http.get<Volunteer>(this.baseUrl + `/volunteers/${email}/get-by-email`, this.httpOptions)
    .pipe(tap(data => {this.currentVolunteer$.next(data);}),
    catchError(this.handleError<Volunteer>('error getting volunteer by Email', null)))
  }

  getThisVolunteerRequests(id: number) : Observable<HelpRequest[]>{
    return this.http.get<HelpRequest[]>(this.baseUrl + `/requests/volunteer/${id}`, this.httpOptions)
    .pipe(tap(data => console.log("fetching your requests...")),
    catchError(this.handleError<HelpRequest[]>('error getting requests', null)));
  }

  logout(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isLoggedIn');
    this.updateLoggedInStatus(false);
    this.updateCurrentVolunteer(null);
  }

  isVolunteerLoggedIn(){
    let volunteer = sessionStorage.getItem('username');
    return !(volunteer === null);
  }

  getSessionStorageVolunteer(){
    let volunteer: string = sessionStorage.getItem('username');
    console.log(volunteer);
    return volunteer;
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
