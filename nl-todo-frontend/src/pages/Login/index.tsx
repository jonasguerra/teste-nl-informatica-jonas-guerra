import { Alert, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ControlledTextField from "../../components/Basics/ControlledTextField";
import { routes } from "../../Routes/routes";
import { AuthService } from "../../services/Auth.service";
import { setUser } from "../../store/slicers/user.slicer";
import { localStorageKeys, responseStatus } from "../../utils/constants";
import {
  ContentWrapper,
  FieldWrapper,
  HeaderWrapper,
  LogoWrapper,
  PageContainer,
} from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: any) => {
    const response = await AuthService.doLogin(data);

    if (responseStatus.SUCCESS.includes(response?.status)) {
      dispatch(setUser({ user: { token: response?.data.access_token } }));

      localStorage.setItem(
        localStorageKeys.userToken,
        JSON.stringify(response?.data.access_token)
      );

      navigate(routes.dashboard);
    } else {
      setErrorMessage("Usuário ou senha inválidos");
    }
  };

  return (
    <PageContainer>
      <LogoWrapper>
        <Typography variant="h1">Todo App</Typography>
      </LogoWrapper>
      <HeaderWrapper>
        <Typography variant="h5" color="primary">
          Login
        </Typography>
        <Typography variant="body2" color="primary">
          Insira os dados da sua conta para logar
        </Typography>
      </HeaderWrapper>
      <ContentWrapper>
        {errorMessage && (
          <Box sx={{ py: "1rem", width: "100%" }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}
        <FieldWrapper>
          <ControlledTextField control={control} name="email" label="E-mail" />
        </FieldWrapper>
        <FieldWrapper>
          <ControlledTextField
            control={control}
            name="password"
            label="Senha"
            type="password"
          />
        </FieldWrapper>
        <FieldWrapper>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </FieldWrapper>
        <FieldWrapper>
          <Typography>
            Não tem uma conta? Clique <a href={routes.auth.signUp}>aqui</a> para
            criar uma
          </Typography>
        </FieldWrapper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Login;
