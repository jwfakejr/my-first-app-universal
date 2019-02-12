import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {


   constructor(//private http: Http,
              private httpClient: HttpClient,
              private recipeService: RecipeService,
              ) {
  }

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf');

    // return this.httpClient.put('https://recipebook-9b418.firebaseio.com/data.json',
    //   this.recipeService.getRecipes(), { observe: "body", params: new HttpParams().set('auth', token)});
    //     //headers: new HttpHeaders().set('Authorization', 'Bearer affsalkflsf');//,
    const req = new HttpRequest('PUT',
      'https://recipebook-9b418.firebaseio.com/data.json',
      this.recipeService.getRecipes(),
      {reportProgress: true}); //params: new HttpParams().set('auth', token) });
    return this.httpClient.request(req);
  }

  getRecipes() {

    //this.http.get('https://recipebook-9b418.firebaseio.com/data.json?auth='+token)
    //this.httpClient.get<Recipe[]>('https://recipebook-9b418.firebaseio.com/data.json?auth='+token)
    this.httpClient.get<Recipe[]>('https://recipebook-9b418.firebaseio.com/data.json',
    {
      observe: 'body',
      responseType: 'json',
      // params: new HttpParams().set('auth', token)
    })
    .map(
        //(response: Response) => {
        (recipes) => {
            // const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}

