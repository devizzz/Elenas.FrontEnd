import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import page from "@navigation/page";
import { NextRouter, useRouter } from "next/router";

import useUserInfoStoreStore from "../../stores/hooks/useUserInfoStoreStore";
import { UserInfo } from "../../apis/types/user/UserInfo";

type NavItem = {
  label: string;
  path: string;
  login: boolean;
  event?: (action?: () => void) => void;
  icon?: any;
};

const navItems: NavItem[] = [
  {
    label: "Cerrar sesión",
    path: page.login,
    icon: <LogoutIcon />,
    login: true,
    event: (action?: () => void) => {
      if (action) {
        action();
      }
    },
  },
  {
    label: "Registrarse",
    path: page.signup,
    icon: <LoginIcon />,
    login: false,
  },
];

function callPath(path: string, router: NextRouter) {
  router.push(path);
}

interface IProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function DropDownLoggedIn(props: IProps) {
  const { anchorEl, setAnchorEl } = props;
  const { getUserInfo, clearUserInfo } = useUserInfoStoreStore();
  const [user, setUser] = React.useState<UserInfo>();

  React.useEffect(() => {
    setUser(getUserInfo());
  }, [getUserInfo]);

  const router = useRouter();
  const open = Boolean(anchorEl);

  const logOut = () => {
    clearUserInfo();
    callPath(page.login, router);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="Menu"
      onClose={handleClose}
      anchorEl={anchorEl}
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <List>
        {navItems.filter(x => (x.login && user?.user) || (!x.login && !user?.user)).map((item: NavItem, index) => (
          <ListItem
            button
            onClick={() => {
              if (item.event) {
                item.event(logOut);
              }
              else {
                callPath(item.path, router);
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Menu>
  );
}

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Elenas
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <DropDownLoggedIn
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </AppBar>
    </Box>
  );
}
