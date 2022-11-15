import { SignupType } from "@common/apis/types/signup/SignupType";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import getErrorCode from "@common/http/getErrorCode";
import getErrorData from "@common/http/getErrorData";
import { NextRouter, useRouter } from "next/router";
import page from "@navigation/page";
import signup from "@common/apis/services/auth/signup";

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupType>();

  const onSubmitSignup: SubmitHandler<SignupType> = async (data) => {
    try {
      await signup(data);
      router.push(page.login);
    } catch (error) {
      const code: number | null = getErrorCode(error);
      if (code === 400) {
        const data = getErrorData(error);
        if (data) {
          alert(data.detail);
        }
      } else {
        alert("Ha ocurrido un error interno");
      }
    }
  };

  return (
    <div>
      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h3" style={{ color: "#5B5B5B" }}>
          Registrarse
        </Typography>
      </Box>
      <div style={{width: "50%", margin: "auto"}}>
        <form onSubmit={handleSubmit(onSubmitSignup)}>
          <FormGroup>
            <FormControl error={errors.email ? true : false} variant="standard">
              <InputLabel htmlFor="email">Correo</InputLabel>
              <Input
                id="email"
                {...register("email", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <FormControl
              error={errors.password ? true : false}
              variant="standard"
            >
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
              />
            </FormControl>
            <FormControl
              error={errors.password_confirmation ? true : false}
              variant="standard"
            >
              <InputLabel htmlFor="password_confirmation">Confirmar contraseña</InputLabel>
              <Input
                id="password_confirmation"
                type="password"
                {...register("password_confirmation", { required: true })}
              />
            </FormControl>
            <FormControl error={errors.first_name ? true : false} variant="standard">
              <InputLabel htmlFor="first_name">Nombres</InputLabel>
              <Input
                id="first_name"
                {...register("first_name", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <FormControl error={errors.last_name ? true : false} variant="standard">
              <InputLabel htmlFor="last_name">Apellidos</InputLabel>
              <Input
                id="last_name"
                {...register("last_name", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <FormControl error={errors.phone ? true : false} variant="standard">
              <InputLabel htmlFor="phone">Número de teléfono</InputLabel>
              <Input
                id="phone"
                {...register("phone", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <FormControl error={errors.username ? true : false} variant="standard">
              <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
              <Input
                id="username"
                {...register("username", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <FormControl error={errors.country ? true : false} variant="standard">
              <InputLabel htmlFor="country">País</InputLabel>
              <Input
                id="country"
                {...register("country", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <FormControl error={errors.city ? true : false} variant="standard">
              <InputLabel htmlFor="city">Ciudad</InputLabel>
              <Input
                id="city"
                {...register("city", { required: true, maxLength: 50 })}
              />
            </FormControl>
            <Button type="submit">Enviar</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

export default Signup;
