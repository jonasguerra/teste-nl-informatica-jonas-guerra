import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ControlledTextField from "../../components/Basics/ControlledTextField";
import { AuthService } from "../../services/Auth.service";
import { setUser } from "../../store/slicers/user.slicer";
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
    let responseData = response?.data;
    dispatch(setUser(responseData));
    localStorage.setItem("userDetails", JSON.stringify(responseData));
    navigate("/dashboard");
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
            Não tem uma conta? Clique <a href="/register">aqui</a> para criar
            uma
          </Typography>
        </FieldWrapper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Login;
