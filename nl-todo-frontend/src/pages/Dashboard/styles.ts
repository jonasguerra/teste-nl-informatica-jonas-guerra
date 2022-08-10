import { Box, Container, Grid, TableCell, Typography } from "@mui/material";
import styled from "styled-components";

export const PageContainer = styled(Container)`
  padding: 2rem;
  margin-top: 100px;
`;

export const PageHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const PageTitle = styled(Typography).attrs({
  variant: "h4",
})``;

export const TableCellFixed = styled(TableCell)`
  display: flex;
  align-items: center;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
`;

export const ContentGrid = styled(Grid).attrs({
  minWidth: "xl",
})`
  flex: 1;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  margin: 0rem 2rem;
`;

export const CustomCardHeader = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  border-radius: 8px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 1rem;
`;
