import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonListComponent} from './pokemons/pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemons/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemons/pokedex/pokedex.component';
import {ConnexionComponent} from './trainer/connexion/connexion.component';
import {TeamComponent} from './trainer/team/team.component';


const routes: Routes = [
  {path: 'pokemons', component: PokemonListComponent},
  {path: 'pokemons/:id', component: PokemonDetailComponent},
  {path: 'pokedex', component: PokedexComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'team', component: TeamComponent},
  {path: '', redirectTo: 'pokedex', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
