import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  messageClass;
  processing: boolean;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  onLoginSubmit() {
    this.form.disable;
    this.processing = true;
    const user = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value
    }
    this.authService.login(user).subscribe(data => {
      console.log("here is the data", data);
      if (data.status === 200) {
        this.form.enable();
        this.processing = true;
        this.authService.storeUserData(data.token, data.username);
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      } else {
        this.form.enable();
        this.processing = false;
        this.message = data.message;
      }
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

}
