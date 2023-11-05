import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { PokemonDetail } from 'src/app/core/models/pokemon.detail';
import { PokemonList } from 'src/app/core/models/pokemon.list';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatProgressBarModule,
  ]
})
export class ListCardComponent implements OnInit {
  pokemons: PokemonDetail[] = [];
  classicMode: boolean = true;

  private offset: number;
  isLoading: boolean = false;
  isLastPage = false;

  searchPokemon: PokemonDetail = new PokemonDetail();
  isSearching = false;


  constructor(
    private pokemonService: PokemonService,
    private router: Router,
  ) {
    this.offset = 0;
    this.pokemonService.searchPokemon$.subscribe((pokemon: any) => {
      if(pokemon.id){
        this.isSearching = true;
        this.searchPokemon = pokemon
      }else{
        this.isSearching = false;
      }
    });
  }

  ngOnInit(): void {
    this.isSearching = false
    this.getPage(this.offset)
  }

  getPage(offset: number) {
    if (!this.isLoading && !this.isLastPage) {
      this.isLoading = true;
      this.pokemonService.getPokemonList(offset)
        .subscribe((list: PokemonList[]) => {
          if (list.length === 0) {
            this.isLastPage = true;
          }

          if (!this.isLastPage) {
            this.getPokemon(list);
          }
        });
    }
  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if (element.scrollHeight - element.scrollTop < 1000) {
      this.getPage(this.offset);
    }
  }


  private getPokemon(list: PokemonList[]) {
    const arr: Observable<PokemonDetail>[] = [];
    list.map((value: PokemonList) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      );
    });

    forkJoin([...arr]).subscribe((pokemons: PokemonDetail[]) => {
      this.pokemons.push(...pokemons);
      this.offset += 20;
      this.isLoading = false;
    })
  }

  getPrincipalType(list: any[]) {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }



  navigateToDetail(pokemon: PokemonDetail) {
    this.router.navigate(['/pokemon_detail', pokemon.id]);
  }



}


