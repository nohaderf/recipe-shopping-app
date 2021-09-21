import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'A super-tasty Schnitzel - just awesome!', 
            'https://assets.bonappetit.com/photos/57ae1afd53e63daf11a4e26f/1:1/w_2560%2Cc_limit/chicken-schnitzel.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            'Big Fat Burger',
            'What else you need to say?',
            'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Smash-Burgers_EXPS_TOHcom20_246232_B10_06_10b.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
      
    ];

    constructor(private slService: ShoppingListService) {

    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }


    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice()) //emit a copy of the updated recipes
    }
}