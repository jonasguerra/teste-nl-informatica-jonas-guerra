import { Card, Link } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";

export const CardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  justify-content: flex-start;
  align-items: center;
`;

export const DefaultLink = styled(Link).attrs({
  variant: "body1",
  underline: "hover",
})``;

export const InfoWrapper = styled(Box).attrs({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})``;
