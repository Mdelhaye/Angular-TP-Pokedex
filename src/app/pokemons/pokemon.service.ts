import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Reception} from '../models/reception.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Pokemon} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getPokemons(nbPokemon: number, limit: number): Observable<Reception<Pokemon>> {
    const url = this.pokemonsUrl + '/pokemons?offset=' + nbPokemon + '&limit=' + limit;
    console.log(url);
    return this.http.get<Reception<Pokemon>>(url).pipe(
      tap(_ => this.log('Fetched pokemons')),
      catchError(this.handleError<Reception<Pokemon>>('getPokemons', ))
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

  getPokemon(id: number) {
    const url = this.pokemonsUrl + '/pokemons/' + id;
    return this.http.get<Pokemon>(url).pipe(tap( _ => this.log(`fetched pokemon id=${id}` )),
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`)));
  }

  getPokemonsBySearch(search: string, nbPokemon: number, limit: number): Observable<Reception<Pokemon>> {
    const url = this.pokemonsUrl + '/pokemons?search=' + search + '&offset=' + nbPokemon + '&limit=' + limit;
    return this.http.get<Reception<Pokemon>>(url).pipe(
      tap(_ => this.log('Fetched pokemons')),
      catchError(this.handleError<Reception<Pokemon>>('getPokemons',))
    );
  }
}
