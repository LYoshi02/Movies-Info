import React from "react";
import { makeStyles } from "@material-ui/core";

import Actor from "./Actor/Actor";

const useStyles = makeStyles({
  castingStyles: {
    overflow: "hidden",
  },
  castingListStyles: {
    overflow: "auto",
    listStyle: "none",
    display: "flex",
    "& li": {
      margin: "1rem .5rem",
      minWidth: "18rem"
    }
  }
});

const Casting = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.castingStyles}>
      <ul className={classes.castingListStyles}>
        {props.cast.map((actor) => (
          <Actor
            key={actor.id}
            name={actor.name}
            character={actor.character}
            imgUrl={actor.profile_path}
          />
        ))}
      </ul>
    </div>
  );
};

export default Casting;