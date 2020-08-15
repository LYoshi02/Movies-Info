import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import authReducer from "./store/reducers/auth";
import inicioReducer from "./store/reducers/inicio";
import layoutReducer from "./store/reducers/layout";
import infoPeliculaReducer from "./store/reducers/infoPelicula";
import movieReviewsReducer from "./store/reducers/movieReviews";
import reviewsReducer from "./store/reducers/reviews";
import * as serviceWorker from './serviceWorker';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  inicio: inicioReducer,
  layout: layoutReducer,
  infoPelicula: infoPeliculaReducer,
  movieReviews: movieReviewsReducer,
  reviews: reviewsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <App />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
