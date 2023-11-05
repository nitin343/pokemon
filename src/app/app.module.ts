import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleComponent } from './modules/module.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './core/services/pokemon.service';
@NgModule({
  declarations: [
    AppComponent,
    ModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    SearchBarComponent,
    HttpClientModule

  ],
  providers: [PokemonService],
  bootstrap: [AppComponent],
})
export class AppModule { }
