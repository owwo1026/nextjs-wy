import { useCallback } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import CustomTextField from '@/components/forms/theme-elements/CustomTextField';
import { useLoader } from '@/hooks/use-loader/use-loader';
import useDialog from '@/hooks/use-dialog';

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

type FormValues = {
  name: String;
  email: String;
  password: String;
  passwordConfirm: String;
};

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  const { openLoader, closeLoader, isLoading } = useLoader();
  const { errorDialog, successDialog } = useDialog();

  const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
    passwordConfirm: z.string().min(1, { message: 'passwordConfirm is required' }),
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
      passwordConfirm: 'a3820512',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(async (formValues: any) => {
    try {
      openLoader();
      const result = await fetch(`/api/register`, {
        method: 'POST',
        body: JSON.stringify(formValues),
      });
      const response = await result.json();
      if (!result.ok) {
        throw new Error(response.message);
      }
      successDialog('註冊成功，請先至電子信箱驗證啟用帳號', () => {
        router.push('/authentication/login');
      });
    } catch (error) {
      errorDialog(error);
    } finally {
      closeLoader();
    }
  }, []);

  return (
    <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      <Box>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
            姓名
          </Typography>
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

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
            電子信箱
          </Typography>
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

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
            密碼
          </Typography>
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

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
            密碼確認
          </Typography>
          <Controller
            name="passwordConfirm"
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
          註冊
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthRegister;
