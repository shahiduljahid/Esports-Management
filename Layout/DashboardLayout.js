import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Hidden, useRadioGroup } from "@material-ui/core";
import AdminNavbarLinks from "../components/Navbars/AdminNavbarLinks.js";
import { Tooltip } from "@material-ui/core";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import adminStyle from "../styles/css/admin.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth.js";
import LoginPage from "../pages/login.js";
import adminRoutes from "./routes/dashboardRoutes";

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer - 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: "#868686",
    background: "#ffffff3b",
    backdropFilter: "blur(5px)",
    height: 64,
    boxShadow:
      "rgb(153 153 153 / 42%) 0px 14px 26px -30px, rgb(0 0 0 / 12%) 0px 4px 23px -30px, rgb(153 153 153 / 20%) 0px 8px 10px -5px",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - 190px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: 60,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  list: {
    width: "100%",
    "& .MuiListItem-button": {
      color: "gray",
      transition: "all 0.2s",
    },
    "& svg": {
      transition: "all 0.2s",
    },
    "& .MuiListItem-button:hover": {
      color: "#01cfff",
    },
    "& .MuiListItem-button:hover svg": {
      color: "#01cfff",
    },
  },
  fullList: {
    width: "auto",
  },
  active: {
    "& .MuiListItem-button": {
      background: "#83def338",
      color: "#01cfff",
    },
    "& svg": {
      color: "#01cfff",
    },
    "& .MuiListItem-button:after": {
      content: '""',
      position: "absolute",
      height: "6px",
      width: "48px",
      backgroundColor: "#01cfff",
      transform: "rotate(90deg)",
      left: "-21px",
      top: "21px",
    },
  },
}));

const DashboardLayout = (props) => {
  const { user, loginStatus } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [permanentOpen, setPermanentOpen] = useState(false);
  const [state, setState] = useState(false);



  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  if (
    !user 
  ) {
    return <LoginPage />;
  }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Link href="/dashboard/">
          <ListItem button>
            <ListItemIcon>
              {" "}
              <img
                style={{ height: 40}}
                src="/img/esGroundOnlyLogo.png"
                alt=""
              />{" "}
            </ListItemIcon>
            <ListItemText>
              <h5 style={{ fontFamily: "'Blanka', sans-serif" ,fontSize:"18px"}} className={adminStyle.logo_title}>ESPORTS GROUND</h5>
            </ListItemText>
          </ListItem>
        </Link>
        <Divider />

        {adminRoutes.map((route, i) => (
          <Link key={i} href={route.href}>
            <a
              className={
                router.pathname == route.href
                  ? clsx(classes.active, {
                      [classes.sidebarActive]: open,
                    })
                  : ""
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <Icon style={{ fontSize: "28px" }} icon={route.icon} />
                </ListItemIcon>
                <ListItemText
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  primary={route.text}
                />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // style={{ backdropFilter: "blur(1)" }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.container}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item sm={2} md={2}>
              <Hidden smDown implementation="css">
                <IconButton
                  style={{
                    marginLeft: open ? 25 : 50,
                    transition: "margin 0.3s linear 0s",
                  }}
                  // color="action"
                  onClick={() => {
                    setOpen(!open);
                    setPermanentOpen(!permanentOpen);
                  }}
                >
                  {open ? (
                    <Tooltip title="Collapse">
                      <MoreVertIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Expand">
                      <FormatListBulletedIcon />
                    </Tooltip>
                  )}
                </IconButton>
              </Hidden>
              <Hidden mdUp implementation="css">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 1, color: "text.primary" }}
                >
                  <Icon
                    style={{ fontSize: "35px", color: "#00cfff" }}
                    icon={menu2Fill}
                  />
                </IconButton>
                {/* <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton> */}
              </Hidden>
            </Grid>
            <Grid item sm={10} md={10}>
              <AdminNavbarLinks />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* tablet menu */}
      <Hidden mdUp implementation="css">
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          {/* <div style={{ width: 300 }}>
                <AdminNavbarLinks />
              </div> */}
          {list("right")}
        </Drawer>
      </Hidden>

      {/* desktop menu */}
      <Hidden smDown implementation="css">
        <Drawer
          onMouseOver={() => open === false && setOpen(true)}
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {list("left")}
        </Drawer>
      </Hidden>
      <main
        onMouseOver={() => setOpen(permanentOpen ? true : false)}
        style={{
          fontFamily: `"Nunito", sans-serif !important`,
          flexGrow: 1,
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(3),
          width: "100%",
          height: "100vh",
        }}
        // className={classes.content}
      >
        <CssBaseline />
        <div style={{ minHeight: 55 }} />
        <div
          className={classes.content}
          style={{ position: "relative", background: "white" }}
        >
          <div className={classes.container}>{props.children}</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
