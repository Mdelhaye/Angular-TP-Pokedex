import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  idPokemon: number;

  constructor() { }

  ngOnInit() {
  }

  onPokemonSelectedId(id: number) {
    this.idPokemon = id;
    // console.log("pokedex:" + id);
  }

}
