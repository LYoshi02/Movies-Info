import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import * as actions from "./store/actions/index";

import Auth from "./containers/Auth/Auth";
import Inicio from "./containers/Inicio/Inicio";
import InfoPelicula from "./containers/InfoPelicula/InfoPelicula";
import Layout from "./hoc/Layout/Layout";
import MovieReviews from "./containers/MovieReviews/MovieReviews";

// API key: 9dbf064d
// Url: http://www.omdbapi.com/?i=tt3896198&apikey=9dbf064d

// Api key: 18499f6e11c3ac0d1100af6fdfcc3ec6
// Url: https://api.themoviedb.org/3/movie/550?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6
// Access token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODQ5OWY2ZTExYzNhYzBkMTEwMGFmNmZkZmNjM2VjNiIsInN1YiI6IjVmMDRlYWJjYTM1YzhlMDAzNzIxOGE2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HC9eyNdB4HdPVy047KPYRfOUDn_8nQy96yA5CvQTEoY

// FIREBASE KEY: AIzaSyAxKAMCrPe4V49zFR74oZBQCXQepERUXO8
function App(props) {
  const { onCheckAuthState } = props;
  let authRoute = null;
  if(!props.isAuth) {
    authRoute = <Route exact path={["/signin", "/signup"]} component={Auth} />;
  }

  useEffect(() => {
    onCheckAuthState();
  }, [onCheckAuthState]);
  
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Inicio} />
          {authRoute}
          <Route path="/page/:page" component={Inicio} />
          <Route path="/pelicula/reviews/:id" component={MovieReviews} />
          <Route path="/pelicula/:id" component={InfoPelicula} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
