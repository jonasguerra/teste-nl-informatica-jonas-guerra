import { Box } from "@mui/material";
import { Container } from "@mui/system";
import styled from "styled-components";

export const PageContainer = styled(Container).attrs({
  maxWidth: "sm",
})`
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoWrapper = styled(Box)``;

export const HeaderWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-top: 1rem;
`;

export const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`;

export const FieldWrapper = styled(Box)`
  width: 100%;
  padding: 0.5rem 0rem;
`;
