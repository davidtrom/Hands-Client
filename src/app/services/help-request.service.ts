import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HelpRequest } from '../models/helpRequest';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Volunteer } from '../models/Volunteer';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getAllRequests() : Observable <HelpRequest[]> {
    console.log("inside request service: ", this.baseUrl+"/requests")
    return this.http.get<HelpRequest[]>(this.baseUrl+"/requests", this.httpOptions)
    .pipe(tap(data => console.log('fetch requests', data)),
      catchError(this.handleError<HelpRequest[]>('get requests', null)));
  }

  changeRequestStatus(id: number, volunteerEmail: string): Observable<HelpRequest> {
    let reqData: Object = {"email": volunteerEmail};
    return this.http.post<HelpRequest>(this.baseUrl+"/requests/"+id+"/update-status", reqData, this.httpOptions)
    .pipe(tap(data => console.log('update status', data)),
      catchError(this.handleError<HelpRequest>('change status', null)));
  }

  getRequest(id: number): Observable<HelpRequest> {
    return this.http.get<HelpRequest>(this.baseUrl+`/requests/${id}`, this.httpOptions)
    .pipe(tap(data => console.log('get detail', data)),
      catchError(this.handleError<HelpRequest>('getting details', null)));
  }

  getThisVolunteerRequests(id: number) : Observable<HelpRequest[]>{
    return this.http.get<HelpRequest[]>(this.baseUrl)
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
