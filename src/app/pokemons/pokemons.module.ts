import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule, MatInputModule,
    MatListModule,
    MatSidenavModule
} from '@angular/material';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {RouterModule} from '@angular/router';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PokedexComponent } from './pokedex/pokedex.component';
import {FormsModule} from '@angular/forms';
import { OptionComponent } from './option/option.component';



@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent, OptionComponent],
    exports: [
        PokedexComponent,
        PokemonListComponent,
        PokemonDetailComponent
    ],
    imports: [
        CommonModule,
        MatListModule,
        RouterModule,
        MatCardModule,
        MatGridListModule,
        MatChipsModule,
        MatIconModule,
        InfiniteScrollModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule
    ]
})

export class PokemonsModule {



}
