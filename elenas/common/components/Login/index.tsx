import { LoginType } from "@common/apis/types/login/LoginType";
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
import loginAuth from "@common/apis/services/auth";
import getErrorCode from "@common/http/getErrorCode";
import getErrorData from "@common/http/getErrorData";
import useUserInfoStoreStore from "../../stores/hooks/useUserInfoStoreStore";
import { NextRouter, useRouter } from "next/router";
import page from "@navigation/page";

const Login = () => {
  const router = useRouter();
  const { setUserInfo } = useUserInfoStoreStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmitSendEmail: SubmitHandler<LoginType> = async (data) => {
    try {
      const userInfo = await loginAuth(data);
      setUserInfo(userInfo);
      router.push(page.task);
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
          Iniciar sesión
        </Typography>
      </Box>
      <div style={{width: "50%", margin: "auto"}}>
        <form onSubmit={handleSubmit(onSubmitSendEmail)}>
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
            <Button type="submit">Enviar</Button>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

export default Login;
