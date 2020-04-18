import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Recipient } from '../models/Recipient';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestorLoginService {
  
  baseUrl = environment.baseUrl;
  recipient: Recipient;
  isLoggedIn$: BehaviorSubject<any> = new BehaviorSubject([]);
  currentRecipient$: BehaviorSubject<any> = new BehaviorSubject([]);
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  // updateCurrentRecipient(recipient : Recipient) {
  //   console.log("user update in service", recipient);
  //   this.currentRecipient$.next(recipient);
  // }

  // updateLoggedInStatus(isLoggedIn : Boolean) {
  //   console.log("user update in service", isLoggedIn);
  //   this.isLoggedIn$.next(isLoggedIn);
  // }

  // checkRecipientEmailAvailability(email: string): Observable<boolean> {
  //   //let reqData: Object = {"email": email};
  //   return this.http.post<boolean>(this.baseUrl+"/recipients/check-email", email, this.httpOptions);
  //     //.pipe(tap(data => console.log(data)));
  // }

  // createRecipient(recipientToCreate:Recipient): Observable<Recipient> {
  //   return this.http.post<Recipient>(this.baseUrl+"/recipients/create", recipientToCreate, this.httpOptions)
  //     .pipe(tap(data => {console.log("requestor created");}), 
  //     catchError(this.handleError<Recipient>('create requestor', null))
  //   )
  // }

  // verifyRecipient(email:string, password:string) : Observable<Recipient>{
  //   console.log("inside service");
  //   let reqData: Object = {"email": email, "password": password};
  //   return this.http.post<Recipient>(this.baseUrl+"/recipients/verify/requestor", reqData, this.httpOptions)
  //     .pipe(tap(data => {this.recipient = data;
  //       console.log("in service ", data)
  //       if(!this.recipient==null){
  //         this.isLoggedIn$.next(true);
  //       }
  //     }),
  //     catchError(this.handleError<Recipient>('verification', null))
  //   )
  // }

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
