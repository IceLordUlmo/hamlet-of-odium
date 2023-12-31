import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import itemsReducer from './items'
import mapReducer from './maps'
import attackReducer from './attacks'
import fightsReducer from './fights'
import recipesReducer from './recipes'

const rootReducer = combineReducers({
  session,
  items: itemsReducer,
  maps: mapReducer,
  attacks: attackReducer,
  fights: fightsReducer,
  recipes: recipesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
