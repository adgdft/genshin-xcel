import { Injectable } from '@angular/core';
import { User } from 'shared/models/user';
import { Observable } from 'rxjs';
import { DatabaseService } from 'shared/dao/database.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: DatabaseService) { }

  save(user: firebase.User) {
    this.db.saveUser(user);
  }

  get(uid: string): Observable<User> {
    return this.db.getUser(uid);
  }

}
