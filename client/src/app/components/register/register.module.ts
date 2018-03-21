import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register.component";
import { routes } from './register-routing.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent],//may export this for no reasons!
  exports: [RouterModule],
  providers: []
})
export class RegisteModule { }
