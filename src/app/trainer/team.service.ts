import { Injectable } from '@angular/core';
import {MessageService} from '../pokemons/message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {catchError, tap} from 'rxjs/operators';
import {Reception} from '../models/reception.model';
import {Pokemon} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.cookieService.get('access_token') })
  };
  urlTeam = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers/me/team';

  constructor(private messageService: MessageService, private http: HttpClient, private cookieService: CookieService) { }

  getIdPokemonTeam(): Promise<number[]> {
    return this.http.get<number[]>(this.urlTeam, this.httpOptions).pipe(
      tap(_ => this.log('Fetched Team')),
      catchError(this.handleError<number[]>('getTeam', ))
    ).toPromise();
  }

  getPokemonFromId(pokemonsId: number[]): Observable<any> {
    let result = new Array<any>();
    pokemonsId.forEach((element: number) => {
      result.push( this.http.get('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons/'  + element));
    });
    return forkJoin(result);
  }

  updatePokemonTeam(team: number[]) {
    console.log(team);
    return this.http.put<number[]>(this.urlTeam, team, this.httpOptions).pipe(
      tap(_ => this.log('Fetched Team')),
      catchError(this.handleError<number[]>('setTeam', ))
    );
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
