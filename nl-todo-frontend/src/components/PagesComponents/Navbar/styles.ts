import { AppBar, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DashboardNavbarRoot = styled(AppBar)`
  justify-content: center;
  height: 86px;
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.shadows[3]};
  width: 100%;
`;

export const SearchAndFilterWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
