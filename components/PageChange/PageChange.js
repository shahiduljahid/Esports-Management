import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    // "& .MuiLinearProgress-colorPrimary": {
    //   backgroundColor: "red",
    // },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#00cfff",
    },
  },
}));

export default function PageChange(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress style={{ height: 6 }} />
    </div>
  );
}

//another style of loader

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import LinearProgress from "@material-ui/core/LinearProgress";

// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//     height: 30,
//   },
// });
// export default function PageChange(props) {
//   const classes = useStyles();
//   const [progress, setProgress] = React.useState(0);
//   const [buffer, setBuffer] = React.useState(10);

//   const progressRef = React.useRef(() => {});
//   React.useEffect(() => {
//     progressRef.current = () => {
//       if (progress > 100) {
//         setProgress(0);
//         setBuffer(10);
//       } else {
//         const diff = Math.random() * 20;
//         const diff2 = Math.random() * 20;
//         setProgress(progress + diff);
//         setBuffer(progress + diff + diff2);
//       }
//     };
//   });

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       progressRef.current();
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <div className={classes.root}>
//       <LinearProgress
//         style={{ height: 10 }}
//         variant="buffer"
//         value={progress}
//         valueBuffer={buffer}
//       />
//     </div>
//   );
// }
