// action types
const LOAD_RECIPES = 'odium/recipes/LOAD'

// action creators
const loadRecipesAction = (data) => {
    return {
        type: LOAD_RECIPES,
        data
    }
}

// thunk creators
export const loadRecipesThunk = () => async (dispatch) => {
    const res = await fetch('/api/recipes', {
        headers: {
            method: 'GET',
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();
    return dispatch(loadRecipesAction(data));
}

// initial state
const initialState = { recipelist: {} };

// reducer
const Reducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_RECIPES:
            newState = {}

            newState.recipelist = {}

            action.data.recipes.forEach((recipe) => newState.recipelist[recipe.id] = recipe)
            console.log(action.data)
            return newState;
        default:
            return state;
    }
}

export default Reducer;