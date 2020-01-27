import {Component, OnInit} from '@angular/core';
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
  limit = 20;


  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.pokemonService.getPokemons(this.nbPokemon, this.limit).subscribe(
      result => this.pokemons = result.data
    );
    this.nbPokemon += this.limit;
  }


  onScroll() {
    this.pokemonService.getPokemons(this.nbPokemon, this.limit).subscribe(
      result => this.pokemons.push.apply(this.pokemons, result.data)
    );
    this.nbPokemon += this.limit;
  }


}
