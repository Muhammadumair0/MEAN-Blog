import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private flashMessagesServices: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogOut() {
    this.authService.logOut();
    this.flashMessagesServices.show("You are sucessfully logged out!", { cssClass: "logOutClass" });
    this.router.navigate(['/login']);
  }

}
