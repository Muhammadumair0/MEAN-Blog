import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { MainHomeComponent } from "./components/main-home/main-home.component";
import { routes } from "./app-routing.module";
import { AuthService } from "./services/auth.service";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NavComponent,
    MainHomeComponent
  ],
  providers: [AuthService],
  exports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
