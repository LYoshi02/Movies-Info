import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Inicio from "./containers/Inicio/Inicio";
import InfoPelicula from "./containers/InfoPelicula/InfoPelicula";
import Layout from "./hoc/Layout/Layout";

// API key: 9dbf064d
// Url: http://www.omdbapi.com/?i=tt3896198&apikey=9dbf064d

// Api key: 18499f6e11c3ac0d1100af6fdfcc3ec6
// Url: https://api.themoviedb.org/3/movie/550?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6
// Access token: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODQ5OWY2ZTExYzNhYzBkMTEwMGFmNmZkZmNjM2VjNiIsInN1YiI6IjVmMDRlYWJjYTM1YzhlMDAzNzIxOGE2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HC9eyNdB4HdPVy047KPYRfOUDn_8nQy96yA5CvQTEoY
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/page/:page" component={Inicio} />
          <Route path="/pelicula/:id" component={InfoPelicula} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
