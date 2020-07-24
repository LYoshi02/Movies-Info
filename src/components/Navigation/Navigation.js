import React from "react";
import { AppBar, Toolbar, IconButton, Box } from "@material-ui/core";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

import Busqueda from "./Busqueda/Busqueda";
import Logo from "../Logo/Logo";

const Navigation = (props) => {
  let busqueda = null;
  if (props.showSearch) {
    busqueda = (
      <Busqueda
        closeSearch={props.toggleSearchBar}
        searchValue={props.searchInputValue}
        searchChanged={props.searchInputChanged}
        searchResults={props.searchResultsData}
        reqLoading={props.reqLoading}
        inputRef={props.searchInputRef}
      />
    );
  }

  const searchIcon = props.showSearch ? (
    <CloseRoundedIcon color="secondary" />
  ) : (
    <SearchRoundedIcon color="secondary" />
  );

  return (
    <Box position="relative">
      <AppBar position="relative">
        <Toolbar>
          <Logo />
          <IconButton onClick={props.toggleSearchBar}>{searchIcon}</IconButton>
        </Toolbar>
      </AppBar>

      {busqueda}
    </Box>
  );
};

export default Navigation;
