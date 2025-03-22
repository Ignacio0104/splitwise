import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es requerida"),
});
