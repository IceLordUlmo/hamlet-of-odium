// action types
const LOAD_MAPS = 'odium/maps/LOAD'

// action creators
const loadMapsAction = (data) => {
    return {
        type: LOAD_MAPS,
        data
    }
}

// thunk creators
export const loadMapThunk = () => async (dispatch) => {
    const res = await fetch('/api/maps', {
        headers: {
            method: 'GET',
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();
    return dispatch(loadMapsAction(data));
}

// initial state
const initialState = { locations: {}, encounters: {} };

// reducer
const Reducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_MAPS:
            newState = {}
            newState.locations = {}

            action.data.locations.forEach((location) => newState.locations[location.id] = location)
            newState.encounters = {}
            action.data.encounters.forEach((encounter) => newState.encounters[encounter.id] = encounter)
            return newState;
        default:
            return state;
    }
}

export default Reducer;