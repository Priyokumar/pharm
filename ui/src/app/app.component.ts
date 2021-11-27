import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {

  isLoggedIn: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.isLoggedIn().subscribe(isLoggedIn=>{
      this.isLoggedIn = isLoggedIn;
    })

  }
  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  logout(){
    this.authService.logout();
  }
}
