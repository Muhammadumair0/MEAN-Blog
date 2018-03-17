import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: boolean = false;
  message1: boolean = false;
  messageError: string;
  messageComplete: string;
  processing;
  time: number = 0;
  emailValid: boolean;
  emailMessage: string;
  userNameValid: boolean;
  userNameMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],
      // Username Input
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateUsername // Custom validation
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
      ])],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
    console.log(this.form.errors);
  }

  // Function to validate email is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }

  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (this.validatePassword(group.controls[password])) {
        if (group.controls[password].value === group.controls[confirm].value) {
          return null; // Return as a match
        } else {
          return { 'matchingPasswords': true } // Return as error: do not match
        }
      }
    }
  }


  // Function to submit form
  onRegisterSubmit() {
    this.processing = true;
    this.form.disable();
    let values = {
      "email": this.form.value.email,
      "username": this.form.value.username,
      "password": this.form.value.password
    }
    this.authService.registerUser(values).subscribe(data => {
      if (data.status === 200) {
        this.message = true;
        this.message1 = false;
        this.messageComplete = data.message;
        this.processing = true;
        this.form.disable();
      } else {
        this.time++;
        this.message = false;
        this.message1 = true;
        this.messageError = data.message;
        this.processing = false;
        this.form.enable();
      }
    });
  }


  checkEmail() {
    const email = this.form.controls.email.value;
    this.authService.checkEmail(email).subscribe(data => {
      if (data.status === 200) {
        this.emailValid = true;
        this.emailMessage = data.message;
        console.log("hi i am there");
      } else {
        this.emailValid = false;
        this.emailMessage = data.message;
        console.log("hi i am there");
      }
    })
  }

  checkUserName() {
    const username = this.form.controls.username.value;
    this.authService.checkUser(username).subscribe(data => {
      if (data.status === 200) {
        this.userNameValid = true;
        this.userNameMessage = data.message;
        console.log("hi i am there");
      } else {
        this.userNameValid = false;
        this.userNameMessage = data.message;
        console.log("hi i am there");
      }
    })
  }

}































































// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Observable } from "rxjs";


// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   form: FormGroup;
//   constructor(private formBuilder: FormBuilder) { }

//   ngOnInit() {

//     this.form = this.formBuilder.group({
//       username: ["", Validators.compose([
//         Validators.required,
//         Validators.minLength(10),
//         Validators.maxLength(30),
//         this.validateUsername
//       ])],
//       email: ["", Validators.required,
//         this.validateEmail],
//       password: ["", Validators.required,
//         this.validatePassword],
//       confirm: ["", Validators.required]
//     }, { Validator: this.matchingPasswords("password", "confirm") });
//   }

//   // Function to validate email is proper format
//   validateEmail(controls) {
//     // Create a regular expression
//     const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//     // Test email against regular expression
//     if (regExp.test(controls.value)) {
//       return null; // Return as valid email
//     } else {
//       return Observable.of({ "validateEmail": true });// Return as invalid email
//     }
//   }

//   // Function to validate username is proper format
//   validateUsername(controls) {
//     // Create a regular expression
//     const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
//     // Test username against regular expression
//     if (regExp.test(controls.value)) {
//       return null; // Return as valid username
//     } else {
//       return Observable.of({ 'validateUsername': true }); // Return as invalid username
//     }
//   }

//   // Function to validate password
//   validatePassword(controls) {
//     // Create a regular expression
//     const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
//     // Test password against regular expression
//     if (regExp.test(controls.value)) {
//       return null; // Return as valid password
//     } else {
//       return Observable.of({ 'validatePassword': true }); // Return as invalid password
//     }
//   }

//   // Funciton to ensure passwords match
//   matchingPasswords(password, confirm) {
//     return (group: FormGroup) => {
//       // Check if both fields are the same
//       if (group.controls[password].value === group.controls[confirm].value) {
//         return null; // Return as a match
//       } else {
//         return Observable.of({ 'matchingPasswords': true }); // Return as error: do not match
//       }
//     }
//   }


//   submitForm() {
//     console.log("Sucessfully submitted form!!!");
//   }



// }
