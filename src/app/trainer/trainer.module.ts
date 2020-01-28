import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionComponent } from './connexion/connexion.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatTabsModule} from '@angular/material';
import { TeamComponent } from './team/team.component';
import {PokemonsModule} from '../pokemons/pokemons.module';



@NgModule({
  declarations: [ConnexionComponent, TeamComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    PokemonsModule,
    MatSidenavModule
  ]
})
export class TrainerModule { }
