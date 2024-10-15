import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { signIn } from "next-auth/react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';


interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

type FormValues = {
  name: String;
  email: String;
  password: String;
};

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  // const { openLoader, closeLoader, isLoading } = useLoader();

  const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: 'Ariel',
      email: 'owwo1026@gmail.com',
      password: 'a3820512',
    },
    resolver: zodResolver(schema)
  });

  const onSubmit = useCallback(
    async (formValues: any) => {
      console.log('onSubmit', formValues);

      const result = await signIn("credentials", {
        callbackUrl: "/",
        ...formValues,
        redirect: false,
      });
      console.log('result', result);

      if (result?.error) {
        console.log('setError', result?.error);
        return;
        // setError("email or password is incorrect");
      }

      // router.push("/");
    },
    [],
  );

  return (
    <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, name, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />

                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, name, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />

                <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { value, name, onChange }, fieldState: { error } }) => (
                    <CustomTextField
                      name={name}
                      onChange={onChange}
                      value={value}
                      type="password"
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  )}
                />
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </form>
  )
};

export default AuthRegister;
