import React, { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, Chip, Grid } from "@material-ui/core";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import CustomBtn from "/components/CustomButtons/Button.js";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";

import { useSnackbar } from "notistack";
import axios from "axios";
// core components
import styles from "/styles/jss/nextjs-material-kit/dashboard";
//dialog component
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import TeamTable from "/components/TeamManageMent/TeamTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  appBar: {
    position: "relative",
  },
  ...styles,
}));
const handleFindTourStatus = (tour) => {
  let roadMap = tour.roadMap;
  let name = "COMPLETE";
  for (let index = 0; index < roadMap.length; index++) {
    const round = roadMap[index];
    if (!round.isComplete) {
      console.log(round);
      name = round.roundName;
      break;
    }
  }
  return name;
};
const handleTeamNumber = (item) => {
  if (item.teams.length) {
    return item.teams.length;
  } else {
    return "NO TEAM";
  }
};
const handleTotalTeamNumber = (item) => {
  const getRoadMap = [...item?.roadMap];
  const teamNumber = getRoadMap[0].qualifiedTeam;
  return teamNumber;
};
const TourDynamicRoute = ({ tournament }) => {
  const {
    tourFormat,
    orgLogo,
    tourLogo,
    tournament_Title,
    org_Name,
    creator,
    roadMap,
    teams,
  } = tournament;
  const [teamData, setTeamData] = useState(teams);
  const levels = [
    {
      label: "Tournament Name",
      value: tournament_Title,
    },
    {
      label: "Organization Name",
      value: org_Name,
    },
    {
      label: "Tour Format",
      value: tourFormat,
    },
    {
      label: "Total Team",
      value: handleTotalTeamNumber(tournament),
    },
    {
      label: "Team Added",
      value: handleTeamNumber(tournament),
    },
    {
      label: "Running Round",
      value: handleFindTourStatus(tournament),
    },
  ];

  const [reload, setReload] = useState(false);
  const classes = useStyles();

   //Add Team  dialog

   const [addTeamTableOpen, SetAddTeamTableOpen] = useState(false);

   const handleAddTeamTableOpen = () => {
    SetAddTeamTableOpen(true);
   };
 
   const handleAddTeamTableClose= () => {
    SetAddTeamTableOpen(false);
   };
    //dialog helpers
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <div style={{ background: "white" }} className={classes.containerFluid}>
        <GridContainer style={{ padding: 0, margin: 0 }}>
          <GridItem style={{ padding: 0, margin: 0 }} xs={12}>
            <h4
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textTransform: "capitalize",
                marginLeft: "20px",
                color: "black",
              }}
              className={classes.title}
            >
              Tournament Overview
            </h4>
          </GridItem>
          <GridItem style={{ padding: 0, margin: 0 }} xs={12} md={8}>
            {" "}
            {levels.map((item) => {
              return (
                <GridItem
                  style={{ padding: 0, margin: "2px 5px" }}
                  xs={12}
                  sm={6}
                  md={6}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        textTransform: "Uppercase",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircleOutlinedIcon style={{ marginRight: "5px" }} />{" "}
                      {`${item?.label}:`}
                    </p>
                    <Chip
                      style={{ padding: "0px 10px", fontWeight: "bold" }}
                      color="primary"
                      label={item?.value}
                    />
                  </div>
                </GridItem>
              );
            })}
          </GridItem>
          <GridItem style={{ padding: 0, margin: 0,marginTop:'50px' }} xs={12} >
       
    
            <Button
              onClick={() => handleAddTeamTableOpen()}
              variant="outlined"
              color="primary"
              component="span"
              startIcon={<AddBoxIcon />}
            >
              Add New Team
            </Button>
            <TeamTable
              tournament={tournament}
              tableData={teamData}
              setTableData={setTeamData}
            />
          </GridItem>
        </GridContainer>
      </div>
        {/** add Team add  dialog */}
        <Dialog
          open={addTeamTableOpen}
          onClose={handleAddTeamTableClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle style={{ textAlign: "center" }} id="scroll-dialog-title">
            {" "}
            <span
              style={{
                color: "#00cfff",
                textTransform: "uppercase",
                fontSize: "13px",
              }}
            >
              {"Add New Team"}
            </span>
          
          </DialogTitle>

          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
           sij team
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {" "}
            <Button
              onClick={() => handleAddTeamTableClose()}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>{" "}
    </>
  );
};

TourDynamicRoute.layout = DashboardLayout;

export default TourDynamicRoute;

export async function getServerSideProps(context) {
  const { tourId } = context.params;

  const tournamentRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/TournamentById/${tourId}`
  );
  const tournament = await tournamentRes.json();
  return { props: { tournament } };
}
