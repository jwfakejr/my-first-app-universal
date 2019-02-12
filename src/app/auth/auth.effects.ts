import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as AuthActions from './store/auth.actions';
import {map, tap, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app'
import {from} from "rxjs";
import {pipe} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  @Effect() // {dispatch: false} as arg if no state change is desired
  authSignup = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNUP),
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: {username: string, password: string}) => {
        console.log('firebase.auth...here');
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));

      }),
      switchMap(() => {
        console.log('calling getIdToken');
        return from(firebase.auth().currentUser.getIdToken());
      }),
      pipe(mergeMap((token: string) => {
        console.log('token =' + token);
        this.router.navigate(['/recipes']);
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })));

  @Effect()
  authSigin = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNIN),
      map((action: AuthActions.TrySignin) => {
        return action.payload;
      }),
      switchMap((authData: {username: string, password: string}) => {
        console.log('firebase.auth...here');
        return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));

      }),
      switchMap(() => {
        console.log('calling getIdToken');
        return from(firebase.auth().currentUser.getIdToken());
      }),
      pipe(mergeMap((token: string) => {
        console.log('token =' + token);
        this.router.navigate(['/recipes']);
        return [
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })));

  @Effect({dispatch: false})
  authLogout = this.actions$
    .pipe(ofType(AuthActions.LOGOUT))
    .pipe(tap(() => {
      this.router.navigate(['/']);
    }));

  // actions is an observable
  constructor(private actions$: Actions, private router: Router) {

  }
}
