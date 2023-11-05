import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from './material.module';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    LoadingComponent,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class SharedModule { }
