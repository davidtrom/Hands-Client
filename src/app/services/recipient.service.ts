import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Recipient } from '../models/Recipient';
import { tap, catchError } from 'rxjs/operators';
import { HelpRequest } from '../models/helpRequest';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  baseUrl = environment.baseUrl;
  recipient: Recipient;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getRecipient(id: number) {
    return this.http.get<Recipient>(this.baseUrl+`/recipients/${id}`, this.httpOptions)
    .pipe(tap(data => console.log('get recipient', data)),
      catchError(this.handleError<Recipient>('getting recipient', null)));
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
