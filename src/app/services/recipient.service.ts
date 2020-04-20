import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recipient } from '../models/Recipient';
import { tap, catchError } from 'rxjs/operators';
import { HelpRequest } from '../models/helpRequest';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  baseUrl = environment.baseUrl;
  recipient: Recipient;
  private isLoggedIn$: BehaviorSubject<boolean>;
  private currentRecipient$: BehaviorSubject<Recipient>;

  //isLoggedIn$: BehaviorSubject<any> = new BehaviorSubject([]);
  //currentRecipient$: BehaviorSubject<any> = new BehaviorSubject([]);
  
  // private currentRecipient$ = new BehaviorSubject<Recipient>(new Recipient());
  // data = this.currentRecipient$.asObservable();

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { 
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
    this.currentRecipient$ = new BehaviorSubject<Recipient>(null);
  }

  createRecipient(recipientToCreate:Recipient): Observable<Recipient> {
    return this.http.post<Recipient>(this.baseUrl+"/recipients/create", recipientToCreate, this.httpOptions)
      .pipe(tap(data => {console.log("requestor created");}), 
      catchError(this.handleError<Recipient>('error registering Requestor', null))
    )
  }

  verifyRecipient(email:string, password:string) : Observable<Recipient>{
    let reqData: Object = {"email": email, "password": password};
    return this.http.post<Recipient>(this.baseUrl+"/recipients/verify", reqData, this.httpOptions)
      .pipe(tap(data => {this.recipient = data;
        if(this.recipient != null){
          this.isLoggedIn$.next(true);
          this.currentRecipient$.next(data);
          sessionStorage.setItem('username', email);
        }
      }),
      catchError(this.handleError<Recipient>('verification', null))
    )
  }

  checkRecipientEmailAvailability(email: string): Observable<Boolean> {
    console.log("inside service check email")
    let reqData: Object = {"email": email};
    return this.http.post<Boolean>(this.baseUrl+"/recipients/check-email", reqData, this.httpOptions)
      .pipe(tap(data => console.log("verifying email")));
  }

  updateCurrentRecipient(recipient : Recipient) {
    console.log("requestor update in service", recipient);
    this.currentRecipient$.next(recipient);
  }

  updateLoggedInStatus(isLoggedIn : boolean) {
    console.log("requestor logged in", isLoggedIn);
    this.isLoggedIn$.next(isLoggedIn);
  }

  getCurrentRecipient(): Observable<Recipient> {
    return this.currentRecipient$.asObservable();
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  getRecipient(id: number) {
    return this.http.get<Recipient>(this.baseUrl+`/recipients/${id}`, this.httpOptions)
    .pipe(tap(data => console.log('get recipient', data)),
      catchError(this.handleError<Recipient>('getting recipient', null)));
  }

  getThisRecipientRequests(id: number) : Observable<HelpRequest[]>{
    return this.http.get<HelpRequest[]>(this.baseUrl + `/requests/recipient/${id}`, this.httpOptions)
    .pipe(tap(data => console.log("fetching your requests...")),
    catchError(this.handleError<HelpRequest[]>('error getting requests', null)));
  }

  logout(){
    sessionStorage.removeItem('username')
    this.updateLoggedInStatus(false);
    this.updateCurrentRecipient(null);
  }

  isRecipientLoggedIn(){
    let recipient = sessionStorage.getItem('username');
    return !(recipient === null);
  }

  getMyRecipient(){
    let recipient: string = sessionStorage.getItem('username');
    return recipient;
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
