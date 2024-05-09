import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, throwError } from 'rxjs';

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

  getUtenti(): Observable<any[]> {
    return this.httpRequest.get<any[]>(`${this.uri}/users`).pipe(
      map(utenti => {
        this.salvaDatiUtentiLocalStorage(utenti); 
        return utenti;
      })
    );
  }

  salvaDatiUtentiLocalStorage(utenti: any[]): void {
    localStorage.setItem('utenti', JSON.stringify(utenti));
    console.log('utenti salvati'+utenti)
    
  }

  getUtente(user: number): Observable<any> {
    const utentiStr = localStorage.getItem('utenti') ?? '';
    try {
      const utenti = JSON.parse(utentiStr);
      console.log('Dati utenti dalla local storage:', utenti);
      const utente = utenti.find((u: any) => u.id == user);
      console.log('Dati utenti dal find', utente);
      return of(utente);
    } catch (error) {
      console.error('Errore nel parsing dei dati dalla local storage:', error);
      return throwError('Errore nel recupero dell\'utente dalla local storage');
    }
  }
  
}
