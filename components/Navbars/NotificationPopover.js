import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import bellFill from "@iconify/icons-eva/bell-fill";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
// material
import { alpha } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Divider,
  MenuItem,
  Typography,
  Avatar,
  IconButton,
  Badge,
  Tooltip,
  List,
  ListSubheader,
} from "@material-ui/core";
// components
import MenuPopover from "./MenuPopover";
import Link from "next/link";
import Scrollbar from "./Scrollbar";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/auth";

//
// import account from "../../_mocks_/account";
import NotificationCom from "./NotificationCom";
import axios from "axios";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: "/admin",
  },
  {
    label: "Profile",
    icon: personFill,
    linkTo: "/admin/profile",
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: "/admin/settings",
  },
];

// ----------------------------------------------------------------------

const data = [
  {
    id: 0,
    type: "1",
    message: "jahid submit a new job",
  },
  {
    id: 1,
    type: "1",
    message: "josef submit a new job",
  },
  {
    id: 2,
    type: "1",
    message: "siam submit a new job",
  },
];

export default function NotificationPopover() {
  const router = useRouter();
  const { user, loginStatus } = useAuth();
  const [newNotification, setNewNotification] = useState([]);
  const [seenNotification, setSeenNotification] = useState([]);
  const [notification, setNotification] = useState([]);

  let role = { isInspector: false, isAdmin: false, isSuperAdmin: false };
  if (router.pathname.includes("inspector")) {
    role.isInspector = true;
  }
  if (router.pathname.includes("admin")) {
    role.isAdmin = true;
  }
  if (router.pathname.includes("superAdmin")) {
    role.isSuperAdmin = true;
  }

  const handleViewAll = () => {
    setNotification(seenNotification);
  };
  const totalUnRead = newNotification.length;

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNewAndSeen = async (array) => {
    const newNotification = [];
    const seenNotification = [];
    for (const item of array) {
      const userDetails = item.seenStatus;
      for (const userObj of userDetails) {
        if (userObj.id === user._id) {
          if (userObj.isSeen) {
            seenNotification.push(item);
            break;
          } else {
            newNotification.push(item);
            break;
          }
        }
      }
    }
    setNewNotification(newNotification);
    setNotification(seenNotification.slice(0, 2));
    setSeenNotification(seenNotification);

    return true;
  };
  const handleNotificationData = async (array) => {
    let selectedType = [];
    if (role.isInspector) {
      selectedType = array?.filter((item) => item.type === "1");
    }
    if (role.isAdmin) {
      selectedType = array?.filter((item) => item.type === "2");
    }
    // if (role.isSuperAdmin) {
    //   selectedType = array.filter((item) => item.type === "2");
    // }
    const res = await handleNewAndSeen(selectedType);
    return true;
  };
  const handleMarkAsRead = async () => {
    const array = [...newNotification];
    for (const item of array) {
      const id = user._id;
      const seenStatus = item.seenStatus;
      for (const getUser of seenStatus) {
        if (getUser.id === id) {
          getUser.isSeen = true;
          break;
        }
      }
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification/${item._id}`,
        { seenStatus: seenStatus }
      );
      if (res.data) {
        await handleNotificationData(res.data);
      }
    }
  };
  useEffect(async () => {
    (function foo() {
      // wrap everything in a self-invoking function, not to expose "times"
      // let times = 50 // how many times to run
      (async function run() {
        // do your stuff, like print the iteration

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/notification`
        );
        const allNotification = await res.json();

        await handleNotificationData(allNotification);

        if (true)
          // 200 * 20 = 4 seconds
          setTimeout(run, 5000);
      })();
    })();
  }, []);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        {/* <Avatar src="/img/favicon.png" alt="" /> */}
        <Badge badgeContent={totalUnRead} color="error">
          <Icon
            style={{ color: "#00cfff" }}
            icon={bellFill}
            width={20}
            height={20}
          />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton onClick={handleMarkAsRead} color="primary">
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              New
            </ListSubheader>
          }
        >
          <NotificationCom color={true} allNotifications={newNotification} />
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              Before that
            </ListSubheader>
          }
        >
          <NotificationCom color={false} allNotifications={notification} />
        </List>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button onClick={handleViewAll} fullWidth disableRipple to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
