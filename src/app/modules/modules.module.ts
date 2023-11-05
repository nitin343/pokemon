import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { SharedModule } from '../shared/shared.module';
import { ModuleRoutingModule } from './module-routing.module';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ListCardComponent } from '../components/list-card/list-card.component';
import { PokemonService } from '../core/services/pokemon.service';



@NgModule({
  declarations: [
    HomeComponent,
    PokemonDetailComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ModuleRoutingModule,
    SearchBarComponent,
    ListCardComponent
  ],
  providers:[PokemonService]
  
})
export class ModulesModule { }
