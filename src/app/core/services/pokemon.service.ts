import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { PokemonDetail } from '../models/pokemon.detail';
import { PokemonList } from '../models/pokemon.list';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
    
  constructor(private http: HttpClient) { }
  private searchPokemonSubject = new BehaviorSubject<PokemonDetail | null>(null);
  searchPokemon$ = this.searchPokemonSubject.asObservable();

  setSearchPokemon(pokemon: any) {
    this.searchPokemonSubject.next(pokemon);
  }


  getPokemonList(offset: number, limit: number = 20) : Observable<PokemonList[]> {
      return this.http.get<PokemonList[]>(this.baseUrl + 'pokemon?offset=' + offset + '&limit=' + limit)
      .pipe(
          map((x: any) => x.results)
      );
  }

  getPokemonDetail(pokemon: number | string): Observable<any> {
      return this.http.get<PokemonDetail>(`${this.baseUrl}pokemon/${pokemon}`);
  }
  
}
