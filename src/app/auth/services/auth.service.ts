import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return user ? true : false;
      })
    );
  }

  logout() {
    this.afAuth
      .signOut()
      .then((data) => {
        console.log('Logout ', data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
