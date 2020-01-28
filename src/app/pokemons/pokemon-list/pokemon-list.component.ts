import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokemonService} from '../pokemon.service';
import {Pokemon} from '../../models/pokemon.model';
import {Reception} from '../../models/reception.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];
  nbPokemon = 0;
  nbPokemonSearch = 0;
  limit = 20;
  search: string;

  @Output() pokemonSelectedId = new EventEmitter<number>();

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons(this.nbPokemon, this.limit).subscribe(
      result => this.pokemons = result.data
    );
    this.nbPokemon += this.limit;
  }

  onScroll() {
    if (this.search === '' || this.search == null) {
      this.pokemonService.getPokemons(this.nbPokemon, this.limit).subscribe(
        result => this.pokemons.push.apply(this.pokemons, result.data)
      );
      this.nbPokemon += this.limit;
    }
    else {
      this.pokemonService.getPokemonsBySearch(this.search, this.nbPokemonSearch, this.limit).subscribe(
        result => this.pokemons.push.apply(this.pokemons, result.data)
      );
      this.nbPokemonSearch += this.limit;
    }
  }

  selectPokemon(id: number) {
    this.pokemonSelectedId.emit(id);
    // console.log("list:" + id);
  }

  searchPokemon(search: string) {
    this.search = search;
    if (search === '' || search == null) {
      console.log({search});
      this.nbPokemon = 0;
      this.limit = 20;
      this.getPokemons();
    } else {
        this.pokemonService.getPokemonsBySearch(search, 0, 20).subscribe(
          result => this.pokemons = result.data
        );
        this.nbPokemonSearch = 20;
      }
    }

}
