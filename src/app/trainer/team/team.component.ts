import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {TeamService} from '../team.service';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import {element} from 'protractor';
import {FormControl} from '@angular/forms';
import {PokemonService} from '../../pokemons/pokemon.service';
import {CookieService} from 'ngx-cookie-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team = new Array<Pokemon>();
  teamId = new Array<number>();
  selected = new FormControl(0);
  idPokemon: number;
  location: Location;

  constructor(private teamService: TeamService, private pokemonService: PokemonService,private cookieService: CookieService, location: Location, private http: HttpClient) {
    this.location = location;
  }

  ngOnInit() {
    console.log(this.cookieService.get('access_token'));
    if (!(this.cookieService.get('access_token'))) {
      this.location.go('pokedex');
      location.reload();
    } else {
      this.getTeam();
    }
  }

  onPokemonSelectedId(id: number) {
    this.idPokemon = id;
    if (this.team.length === 6) {
      alert('Impossible d\'ajouter plus de 6 Pokémons dans l\'équipe !');
    } else {
      this.pokemonService.getPokemon(this.idPokemon).subscribe(result => this.addPokemon(result));
    }
  }

  removePokemon(index: number) {
    this.team.splice(index, 1);
  }

  addPokemon(pokemon: Pokemon) {
    if (confirm(`Ajouter ${pokemon.id} - ${pokemon.name} dans mon équipe ?`)) {
      this.team.push(pokemon);
      this.selected.setValue(this.team.length - 1);
    }
  }

  updateTeam() {
    this.teamId = [];
    this.team.forEach((pokemon: Pokemon) => this.teamId.push(pokemon.id));
    this.teamService.updatePokemonTeam(this.teamId).subscribe(result => console.log(result));
  }

  getTeam() {
    this.teamService.getIdPokemonTeam().then(
      data => {
        if (data == null) {
          console.log('Error: data is not defined!');
          // TODO
        } else {
          this.teamService.getPokemonFromId(data).subscribe(responseList => {
            responseList.forEach((detailPokemon: Pokemon) => {
              this.team.push(detailPokemon);
            });
          });
        }
      }
    );
  }


}
