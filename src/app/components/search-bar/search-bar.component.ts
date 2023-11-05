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
  myControl = new FormControl('');
  search: FormControl = new FormControl('');
  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;
 
  pokemons: PokemonDetail[] = [];
  isLoading: boolean = false;
  isLastPage = false;
  
  
  constructor(private pokemonService: PokemonService){ }

    filteredOptions: string[] = [];
  
  private searchTerms = new Subject<string>();

  ngOnInit() {
    this.searchTerms
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) => this.pokemonService.getPokemonDetail(term))
    )
    .subscribe({
      next: (pokemon: PokemonDetail) => {
        console.log('next');
        this.searchPokemon = pokemon;
        this.isLoading = false;
        this.pokemonService.setSearchPokemon(this.searchPokemon);
      },
      error: (error: any) => {
        this.isLoading = false;
        if (error.status === 404) {
          console.log('5');
          this.pokemonService.setSearchPokemon('');
        }
      },
    });
  }
  
  onSearchPokemon(): void {
    const value = this.search.value;
    console.log(value);
    
    if (value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.searchTerms.next(value); 
    }
  }

 
}
