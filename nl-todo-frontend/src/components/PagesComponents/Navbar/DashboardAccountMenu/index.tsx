import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Menu } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../Routes/routes";
import { clearUser } from "../../../../store/slicers/user.slicer";
import { localStorageKeys } from "../../../../utils/constants";

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
}

export function AccountMenu({ anchorEl, open, handleClose }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem(localStorageKeys.userToken);
    navigate(routes.auth.login);
  };

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Button color="secondary" onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </Button>
      </Menu>
    </div>
  );
}
