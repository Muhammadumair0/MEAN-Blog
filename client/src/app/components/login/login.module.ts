import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './login-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  exports: [RouterModule]
})
export class LoginModule { }
