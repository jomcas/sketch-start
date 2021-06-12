import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private angularFireAuth: AngularFireAuth, // Dependency Injection (DI)
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.user$.next({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else {
        this.user$.next(null);
      }
    });
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.signInWithPopup(provider);

    console.log(credential);
  }

  async signOut() {
    await this.angularFireAuth.signOut();
    this.router.navigate(["/"]);
  }
}