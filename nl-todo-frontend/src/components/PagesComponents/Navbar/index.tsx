import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AccountMenu } from "./DashboardAccountMenu";
import { DashboardNavbarRoot } from "./styles";

export default function DashboardNavbar() {
  const location = useLocation();
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(
    null
  );

  const handleAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAccount(null);
  };

  const openAccountMenu = Boolean(anchorElAccount);

  return (
    <DashboardNavbarRoot>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
          py: 1,
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            mr: "1rem",
          }}
        >
          <Tooltip title="Minha conta">
            <IconButton
              color="primary"
              onClick={handleAccountMenu}
              id="account-menu-button"
              aria-controls={openAccountMenu ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAccountMenu ? "true" : undefined}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
          </Tooltip>
          <AccountMenu
            anchorEl={anchorElAccount}
            open={openAccountMenu}
            handleClose={handleClose}
          />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
}
