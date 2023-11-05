import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PokemonService } from '../core/services/pokemon.service';
import { LazyLoadImageDirective } from '../shared/directive/lazy-loading-image.directive';


@NgModule({
  declarations: [
    LazyLoadImageDirective
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [],
  providers: [PokemonService]
})
export class ComponentsModule { }
