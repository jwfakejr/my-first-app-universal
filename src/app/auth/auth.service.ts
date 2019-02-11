import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signinChanged = new Subject<boolean>();
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
     .catch(
       error => console.log(error)
     )
  }
  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string ) => this.token = token
            );
          this.signinChanged.next(true)
        }
      )
      .catch (
        error => console.log(error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  signoutUser(){
    firebase.auth().signOut()
    this.token = null;
    this.signinChanged.next(false);
    this.router.navigateByUrl('/');
  }
  isAuthenticated(){
    return this.token !== null;
  }
}
