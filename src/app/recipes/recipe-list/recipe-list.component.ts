import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromRecipe from '../store/recipe.reducers'
import {take} from "rxjs/internal/operators";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) {

  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    // this.store.select('recipes')
    //   .pipe(take(1))
    //   .subscribe((recipeState: fromRecipe.State) =>
    //     console.log(recipeState.recipes)
    //   )
  }


  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
