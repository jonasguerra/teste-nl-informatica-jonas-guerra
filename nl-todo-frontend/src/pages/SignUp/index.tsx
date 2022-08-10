import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/Basics/ControlledTextField";
import { routes } from "../../Routes/routes";
import { signUpValidations } from "../../utils/form-validations";
import {
  ContentWrapper,
  FieldWrapper,
  HeaderWrapper,
  LogoWrapper,
  PageContainer,
} from "./styles";

const SignUp = () => {
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
    console.log(data);
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

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
