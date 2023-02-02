import React, { useEffect, useState } from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import AccountPopover from "./AccountPopover.js";
// import NotificationsPopover from "./NotificationPopover.js";
import SearchBar from "./SearchBar.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <SearchBar />

      {/* <NotificationsPopover /> */}
      <AccountPopover />
    </div>
  );
}
