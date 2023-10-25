import './SingleRecipe.css'
import { useSelector } from 'react-redux';
const SingleRecipe = ({ recipe }) => {
    console.log("recipe", recipe.ingredients)
    const items = useSelector((state) => state.items.items)
    return (
        <a>
            <div id='recipe-for-grid'>
                <div id='recipe-name-for-grid'><h2>{recipe.name}</h2></div>
                {recipe.ingredients.map(ingredient => <div id='recipe-item'> {ingredient.quantity} of {items[ingredient.item_id].name}</div>)}
            </div>
        </a>
    )

}

export default SingleRecipe