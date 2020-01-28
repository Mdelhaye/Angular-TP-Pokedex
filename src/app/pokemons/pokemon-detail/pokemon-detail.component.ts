import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../pokemon.service';
import {Pokemon} from '../../models/pokemon.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnChanges {

  route: ActivatedRoute;
  pokemonService: PokemonService;
  location: Location;
  pokemon: Pokemon;

  @Input() son: boolean;
  @Input() idPokemonRecu: number;

  constructor(route: ActivatedRoute, pokemonService: PokemonService, location: Location) {
    this.route = route;
    this.pokemonService = pokemonService;
    this.location = location;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("detail:" + this.idPokemonRecu);
    if (this.idPokemonRecu !== undefined) {
      this.getPokemon(this.idPokemonRecu);
    } else {this.getPokemon(1);}
  }

  getPokemon(id: number) {
    // const id = +this.route.snapshot.paramMap.get('id');
    if (id !== 0) {
      this.pokemonService.getPokemon(id).subscribe(result => this.pokemon = result);
    }
  }

  startMusic(input: any) {
    input.play();
  }

  goBack() {
    this.location.back();
  }
}
