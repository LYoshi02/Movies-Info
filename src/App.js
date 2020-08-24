import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import * as actions from "./store/actions/index";

import Auth from "./containers/Auth/Auth";
import Inicio from "./containers/Inicio/Inicio";
import InfoPelicula from "./containers/InfoPelicula/InfoPelicula";
import Layout from "./hoc/Layout/Layout";
import MovieReviews from "./containers/MovieReviews/MovieReviews";
import User from "./containers/User/User";

function App(props) {
  const { onCheckAuthState } = props;
  let userRoute = null;
  if(props.isAuth) {
    userRoute = <Route path="/profile" component={User} />
  } else {
    userRoute = <Route exact path={["/signin", "/signup"]} component={Auth} />;
  }

  useEffect(() => {
    onCheckAuthState();
  }, [onCheckAuthState]);
  
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Inicio} />
          {userRoute}
          <Route path="/page/:page" component={Inicio} />
          <Route path="/pelicula/reviews/:id" component={MovieReviews} />
          <Route path="/pelicula/:id" component={InfoPelicula} />
          <Redirect to={props.redirectPath} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    redirectPath: state.auth.redirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
