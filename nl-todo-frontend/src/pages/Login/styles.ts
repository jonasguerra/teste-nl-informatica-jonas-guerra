import { Box } from "@mui/material";
import styled from "styled-components";

export const PageContainer = styled(Box).attrs({
  gap: 3,
})`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

export const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
`;

export const FieldWrapper = styled(Box)`
  padding: 1rem 0rem;
  width: 100%;
`;
