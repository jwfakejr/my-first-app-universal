import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {withLatestFrom, map, switchMap} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Recipe} from '../recipe.model';
import {environment} from '../../../environments/environment';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() =>
      this.http.get<Recipe[]>(environment.apiUrl)

    ),
    map(recipes => new RecipeActions.SetRecipes(recipes))
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([, recipeState]) => this.http.put(environment.apiUrl, recipeState.recipes, {reportProgress: true}))
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromRecipe.FeatureState>) {}

}
