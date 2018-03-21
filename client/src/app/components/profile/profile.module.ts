import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from "./profile-routing.module";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent],
  exports: [RouterModule]
})
export class ProfileModule { }
