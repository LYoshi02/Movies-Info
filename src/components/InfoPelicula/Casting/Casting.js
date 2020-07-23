import React from "react";
import Actor from "./Actor/Actor";

import classes from "./Casting.module.css";

const Casting = (props) => {
  return (
    <div className={classes.Casting}>
      <ul className={classes.CastingList}>
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
