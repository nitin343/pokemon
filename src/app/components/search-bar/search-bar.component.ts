import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {  Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonDetail } from 'src/app/core/models/pokemon.detail';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-searchBar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    CommonModule,
    SharedModule
  ],
})

export class SearchBarComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  searchPokemon: PokemonDetail = new PokemonDetail();
 
  pokemons: PokemonDetail[] = [];
  isLastPage = false;
  
  
  constructor(private pokemonService: PokemonService){ }

    filteredOptions: string[] = [];
  
  private searchTerms = new Subject<string>();

  ngOnInit() {
    
  }
  
  onSearchPokemon(): void {
    const value = this.searchControl.value;
    console.log(value);
    
    if (value) {
      this.searchControl.valueChanges
    .pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term: string) => {
        console.log(term, 'teerm');
        
       return this.pokemonService.getPokemonDetail(term)
      })
    )
    .subscribe({
      next: (pokemon: PokemonDetail) => {
        this.searchPokemon = pokemon;
        this.pokemonService.setSearchPokemon(this.searchPokemon);
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.pokemonService.setSearchPokemon('')
        }
      },
    });
      
    }
  }

 
}
