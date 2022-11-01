import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<IUser> =
    this.fireStore.collection('users');
  private users = this.usersCollection.snapshotChanges().pipe(
    map((changes) => {
      return changes.map((a: any) => {
        const data = a.payload.doc.data() as IUser;
        return data;
      });
    })
  );

  constructor(private fireStore: AngularFirestore) {}

  getUsers() {
    return this.users;
  }

  createUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(
      `users/${user.uid}`
    );
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      role: user.role || 'customer',
    };
    return userRef.set(data);
  }

  updateUserRole(user: IUser, role: string) {
    this.fireStore.doc(`users/${user.uid}`).update({ role: role });
  }
}
