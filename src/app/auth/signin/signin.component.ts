import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataStorageService} from "../../shared/data-storage.service";
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
              private dataStorage: DataStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
    setTimeout(() =>this.dataStorage.getRecipes(),1000); // need to wait awhile for the token to be returned

  }
  getRecipes() {
    this.dataStorage.getRecipes();
  }
}
