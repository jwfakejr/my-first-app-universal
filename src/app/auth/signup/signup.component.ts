import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Store} from "@ngrx/store";
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,

             ) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
    this.store.dispatch(new RecipeActions.FetchRecipes());

  }

}
