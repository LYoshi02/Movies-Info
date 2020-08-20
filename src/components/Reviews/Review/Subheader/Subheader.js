import React from "react";
import { Box, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/styles";

import { getLongDate } from "../../../../shared/utility";

const useStyles = makeStyles({
  ratingStyles: {
    marginLeft: "-3px",
    marginRight: "1rem",
  },
  starsStyles: {
    color: "var(--color-stars)"
  },
});

const Subheader = (props) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Rating
        readOnly
        value={props.stars}
        classes={{ root: classes.starsStyles }}
        size="small"
        className={classes.ratingStyles}
      />
      <Typography variant="caption">{getLongDate(props.postDate)}</Typography>
    </Box>
  );
};

export default Subheader;
