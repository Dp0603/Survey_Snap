import React, { useState } from "react";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNotification } from "../../contexts/NotificationContext"; 

const NotificationBell = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotification();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box px={2} py={1}>
          <Typography variant="subtitle1">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <MenuItem disabled>No notifications</MenuItem>
        ) : (
          notifications.slice(0, 5).map((n) => (
            <MenuItem key={n._id} onClick={handleClose}>
              <Typography
                variant="body2"
                fontWeight={n.read ? "normal" : "bold"}
              >
                {n.message}
              </Typography>
            </MenuItem>
          ))
        )}
        {notifications.length > 0 && (
          <>
            <Divider />
            <MenuItem onClick={() => { markAllAsRead(); handleClose(); }}>
              <Typography variant="caption">Mark all as read</Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default NotificationBell;
