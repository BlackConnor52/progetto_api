import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  uri:string = 'https://jsonplaceholder.typicode.com'; // uri di base, per non ripeterlo sempre

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpRequest: HttpClient) { }

  getUtenti():Observable<any[]>{
    return this.httpRequest.get<any[]>(`${this.uri}/users`)
  }

  getUtente(user:number):Observable<any[]>{
    return this.httpRequest.get<any[]>(`${this.uri}/users/${user}`)
  }
}
