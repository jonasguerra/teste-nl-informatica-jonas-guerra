import * as yup from "yup";

export const loginValidations = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export const signUpValidations = yup.object({
  email: yup
    .string()
    .email("E-mail deve ser um e-mail válido")
    .required("E-mail é obrigatório"),
  password: yup.string().required("Digite sua senha"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
});
