import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Recipes.css'
import * as recipeActions from '../../store/recipes'
import * as itemActions from '../../store/items'
import SingleRecipe from './SingleRecipe'

const Recipes = () => {
    const recipes = useSelector((state) => state.recipes.recipelist)

    const dispatch = useDispatch();

    let recipesList = Object.values(recipes)

    useEffect(() => {
        dispatch(itemActions.loadItemsThunk())
        dispatch(recipeActions.loadRecipesThunk())
    }, [dispatch])

    return (
        <div>
            <h1 id='recipe-text'>Recipes</h1>
            <div id='recipe-grid'>

                {recipesList.map(recipe => <SingleRecipe key={recipe.id} recipe={recipe} />)}

            </div>
        </div>
    )
}

export default Recipes