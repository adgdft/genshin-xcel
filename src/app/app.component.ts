import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subscription: Subscription;
  
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    this.subscription = auth.afUser$.subscribe(afUser => {
      if (afUser) {
        userService.save(afUser);
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl).then(
            isSuccess => {
              if (!isSuccess) router.navigateByUrl('/');
            }
          );
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
