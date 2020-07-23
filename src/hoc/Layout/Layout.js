import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navigation from "../../components/Navigation/Navigation";
import { grey, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[900] },
    secondary: { main: indigo[500] },
    text: {
      primary: "#fff",
      secondary: "var(--color-gris-oscuro)",
    },
  },
  typography: {
    htmlFontSize: 10,
  },
});

const Layout = (props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchInputValue.trim() !== "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=18499f6e11c3ac0d1100af6fdfcc3ec6&language=es&query=${searchInputValue}&page=1&include_adult=false`
        )
        .then((res) => {
          setSearchResults(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchInputValue]);

  const toggleSearchBarHandler = () => {
    setShowSearchBar((prevState) => !prevState);
  };

  const searchInputHandler = (event) => {
    setSearchInputValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column">
        <Grid item>
          <Navigation
            showSearch={showSearchBar}
            searchInputValue={searchInputValue}
            searchInputChanged={searchInputHandler}
            searchResultsData={searchResults}
            toggleSearchBar={toggleSearchBarHandler}
          />
        </Grid>

        <Grid item>{props.children}</Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;
