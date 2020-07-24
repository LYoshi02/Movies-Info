import React, { useState, useEffect , useRef} from "react";
import * as actions from "../../store/actions/index";
import { Grid, createMuiTheme, ThemeProvider } from "@material-ui/core";

import Navigation from "../../components/Navigation/Navigation";
import { grey, indigo } from "@material-ui/core/colors";
import { connect } from "react-redux";

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
    htmlFontSize: 10
  }
});

const Layout = (props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const searchInputRef = useRef();

  const { onSearchMovie, onRestartSearchValues } = props;
  useEffect(() => {
    if (searchInputValue.trim() !== "") {
      const timer = setTimeout(() => {
        if(searchInputValue === searchInputRef.current.value) {
          onSearchMovie(searchInputValue);
        }

        return () => {
          clearTimeout(timer);
        }
      }, 500)
     
    } else {
      onRestartSearchValues();
    }
  }, [searchInputValue, onSearchMovie, onRestartSearchValues]);

  const toggleSearchBarHandler = () => {
    setShowSearchBar((prevState) => !prevState);
    if(!showSearchBar) {
      setSearchInputValue("");
      onRestartSearchValues();
    }
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
            toggleSearchBar={toggleSearchBarHandler}
            searchInputValue={searchInputValue}
            searchInputChanged={searchInputHandler}
            searchResultsData={props.searchResults}
            reqLoading={props.reqLoading}
            searchInputRef={searchInputRef}
          />
        </Grid>

        <Grid item>{props.children}</Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.layout.searchResults,
    reqLoading: state.layout.reqLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchMovie: (searchValue) => dispatch(actions.searchMovie(searchValue)),
    onRestartSearchValues: () => dispatch(actions.restartSearchValues())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
