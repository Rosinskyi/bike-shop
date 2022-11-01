import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../models/user';
import { GoogleAuthProvider } from 'firebase/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<IUser | undefined> = this.auth.authState.pipe(
    switchMap((user) => {
      return this.firestore.doc<IUser>(`users/${user?.uid}`).valueChanges();
    })
  );

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  async signIn(email: string, password: any) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: any) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  signOut() {
    this.auth.signOut();
  }
  async singInWithGoogle() {
    await this.auth.signInWithPopup(new GoogleAuthProvider()).then((i) => {
      if (i.additionalUserInfo?.isNewUser) {
        this.userService.createUser(i.user);
      }
    });
  }
}
