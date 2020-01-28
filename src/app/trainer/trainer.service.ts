import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from '../pokemons/message.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

private trainerURL = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  login(email: string, password: string): Promise <User> {
    const url = this.trainerURL + '/auth/login';
    console.log(url);

    return this.http.post<User>(url, {email, password}).pipe(
      tap(_ => this.log('connexion réussi')),
      catchError(this.handleError<User>('connexion échoué', ))
    ).toPromise();
  }

  private log(message: string) {
    this.messageService.add(`PokemonService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
