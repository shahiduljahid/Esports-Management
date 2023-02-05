import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    width: "auto",
  },
});

const LoadingSkeleton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton />
    </div>
  );
};

export default LoadingSkeleton;
