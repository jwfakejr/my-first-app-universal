import {Injectable} from '@angular/core';
// import { Headers, Http, Response} from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import {HttpParams} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


   constructor(//private http: Http,
              private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    ///const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://udemy-ng-http.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});
    //return this.http.put('https://recipebook-9b418.firebaseio.com/data.json?auth='+token,

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
    const token = this.authService.getToken();
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

