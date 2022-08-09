import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/ControlledTextField";
import {
  ContentWrapper,
  FieldWrapper,
  HeaderWrapper,
  PageContainer,
} from "./styles";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <PageContainer>
      <HeaderWrapper>
        <Typography variant="h3" color="secondary">
          Login
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
          />
        </FieldWrapper>
        <FieldWrapper>
          <Button
            onSubmit={handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </FieldWrapper>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Login;
