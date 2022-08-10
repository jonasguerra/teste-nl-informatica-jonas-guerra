import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ControlledTextField from "../../components/Basics/ControlledTextField";
import { routes } from "../../Routes/routes";
import { AuthService } from "../../services/Auth.service";
import { setUser } from "../../store/slicers/user.slicer";
import { localStorageKeys, responseStatus } from "../../utils/constants";
import { signUpValidations } from "../../utils/form-validations";
import {
  ContentWrapper,
  FieldWrapper,
  HeaderWrapper,
  LogoWrapper,
  PageContainer,
} from "./styles";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(signUpValidations),
  });

  const onSubmit = async (data: any) => {
    const response = await AuthService.doSignUp(data);

    if (responseStatus.SUCCESS.includes(response?.status)) {
      //auto login user
      const response = await AuthService.doLogin(data);
      if (responseStatus.SUCCESS.includes(response?.status)) {
        dispatch(setUser({ user: { token: response?.data.access_token } }));
        localStorage.setItem(
          localStorageKeys.userToken,
          JSON.stringify(response?.data.access_token)
        );
        navigate(routes.dashboard);
      }
    }
  };

  return (
    <PageContainer>
      <LogoWrapper>
        <Typography variant="h1">Todo App</Typography>
      </LogoWrapper>
      <HeaderWrapper>
        <Typography variant="h5" color="primary">
          Criar conta
        </Typography>
        <Typography variant="body2" color="primary">
          Insira seu e-mail e senha para criar a sua conta
        </Typography>
      </HeaderWrapper>
      <ContentWrapper>
        <FieldWrapper>
          <ControlledTextField
            control={control}
            name="email"
            label="E-mail"
            errorMessage={errors?.email?.message}
          />
        </FieldWrapper>
        <FieldWrapper>
          <ControlledTextField
            control={control}
            name="password"
            label="Senha"
            type="password"
            errorMessage={errors?.password?.message}
          />
        </FieldWrapper>
        <FieldWrapper>
          <ControlledTextField
            control={control}
            name="password_confirmation"
            label="Confirmar senha"
            type="password"
            errorMessage={errors?.password_confirmation?.message}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
            fullWidth
          >
            Criar conta
          </Button>
        </FieldWrapper>
        <FieldWrapper>
          <Typography>
            Já tem uma conta? Clique <a href={routes.auth.login}>aqui</a> para
            logar
          </Typography>
        </FieldWrapper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default SignUp;
