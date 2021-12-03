import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  fg: FormGroup;
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  authStateSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    this.fg = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  ngOnInit() {}

  login() {
    this.afAuth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then((data) => {
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.open('Invalid credential', 'Got it!', { duration: 7000 });
      });
  }
}
