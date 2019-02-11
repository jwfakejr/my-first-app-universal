import { Component } from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {RecipeService} from "../../recipes/recipe.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
//import { Response } from '@angular/http';
import {HttpEvent} from "@angular/common/http";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private router: Router,
              private recipeService: RecipeService) {
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.signoutUser();
    this.router.navigateByUrl('/');
    this.recipeService.clearRecipes();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
