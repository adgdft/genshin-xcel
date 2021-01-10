import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  afUser$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.afUser$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get user$(): Observable<User> {
    return this.afUser$.pipe(switchMap(afUser => {
      if (afUser) return this.userService.get(afUser.uid);
      return of(null);
    }))
  }

  // get user$(): Observable<User> {
  //   let user = new Observable<User>(obs => {
  //     obs.next({
  //       uid: 'anyvalueID',
  //       name: 'Binh',
  //       email: 'binh@mail.com',
  //       isAdmin: true
  //     });
  //     obs.complete();
  //   });
  //   return user;
  // }
}
