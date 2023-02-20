import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import styles from "/styles/jss/nextjs-material-kit/dashboard";

//dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//core component
import DashboardLayout from "../../Layout/DashboardLayout";
import { useAuth } from "../../lib/auth";
import CustomButton from "/components/CustomButtons/Button.js";
import AllTournamentTable from "/components/Tournament/AllTournamentTable";
import TimeLine from "/components/TimeLine/TimeLine";
import { useSnackbar } from "notistack";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationDialog from "/components/CustomDialog/ConfirmationDialog";
import AllTournamentDetailsTable from "../../components/TeamManageMent/AllTournamentDetailsTable";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },

  ...styles,
}));
const handleRoadMapFilter = (array) => {
    return array.filter((ele) => ele.roadMap.length > 0);
  };
const TeamManagement = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [reload, setReload] = useState(false);
  const [tableData, setTableData] = useState([]);
  const itemWithRoadMap = handleRoadMapFilter(tableData);

  useEffect(async () => {
    setReload(true);
    const id = user._id;
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tournaments/singleUserTournament/${id}`
    );
    setTableData(res.data);
    setReload(false);
  }, [user]);
  return (
    <>
      <div className={classes.containerFluid}>
        <AllTournamentDetailsTable tournaments={itemWithRoadMap} reload={reload} />
      </div>
    </>
  );
};
TeamManagement.layout = DashboardLayout;

export default TeamManagement;
