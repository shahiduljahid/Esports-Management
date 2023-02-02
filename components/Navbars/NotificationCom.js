import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/contactPageSection/contactPage";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import axios from "axios";

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
  bgColor: {
    backgroundColor: "#01cfff47",
  },
  ...styles,
}));

const NotificationCom = ({ allNotifications, color }) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const handleUserPhoto = (id) => {
    const findUser = users.find((user) => user._id === id);
    if (findUser) {
      return findUser.photoUrl;
    } else {
      return "";
    }
  };
  const handleDate = (getDate) => {
    let date = new Date(getDate);

    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  };

  useEffect(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`
    );
    const data = res.data;
    setUsers(data);
  }, []);

  return (
    <>
      {allNotifications.map((notification) => (
        <>
          <ListItem
            className={`${color ? classes.bgColor : ""}`}
            key={notification._id}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar
                alt={notification.name}
                src={handleUserPhoto(notification.userId)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={notification.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {notification.message}
                  </Typography>
                </React.Fragment>
              }
            />
            <Typography   component="span"
                    variant="subtitle2">{handleDate(notification?.date)}</Typography>
          </ListItem>
          
          <Divider variant="inset" component="li" />
        </>
      ))}
    </>
  );
};

export default NotificationCom;
