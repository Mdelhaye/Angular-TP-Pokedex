import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../pokemon.service';
import {Pokemon} from '../../models/pokemon.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  route: ActivatedRoute;
  pokemonService: PokemonService;
  location: Location;

  @Input() pokemon: Pokemon;
  constructor(route: ActivatedRoute, pokemonService: PokemonService, location: Location) {
    this.route = route;
    this.pokemonService = pokemonService;
    this.location = location;
  }

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe( result => this.pokemon = result);
  }

  startMusic(input: any) {
    input.play();
  }

  goBack() {
    this.location.back();
  }
}
