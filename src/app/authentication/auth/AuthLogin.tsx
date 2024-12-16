import { useCallback } from 'react';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, Typography, FormGroup, FormControlLabel, Button, Checkbox } from '@mui/material';

import CustomTextField from '@/app/admin/components/forms/theme-elements/CustomTextField';
import { useLoader } from '@/hooks/use-loader/use-loader';
import useDialog from '@/hooks/use-dialog';
import { routes } from '@/config/routes';

interface loginType {
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

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const router = useRouter();
  const { openLoader, closeLoader, isLoading } = useLoader();
  const { errorDialog, successDialog } = useDialog();

  const schema = z.object({
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
      email: 'owwo1026@gmail.com',
      password: 'a3820512',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(async (formValues: any) => {
    try {
      openLoader();
      const result = await signIn('credentials', {
        redirect: false,
        callbackUrl: routes.admin.index,
        ...formValues,
      });
      console.log('result', result);

      if (!result?.ok) {
        let message;
        switch (result?.error) {
          case 'CredentialsSignin':
            message = '帳號密碼錯誤';
            break;
          case 'VerificationFailed':
            message = '帳號驗證錯誤';
            break;
          default:
            message = '未知的錯誤';
        }
        throw new Error(message);
      } else {
        router.push(result?.url || routes.admin.index);
      }
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

      <Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="username" mb="5px">
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
        </Box>
        <Box mt="25px">
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
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
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="記住我" />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            忘記密碼
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          登入
        </Button>
      </Box>
      {subtitle}
    </form>
  );
};

export default AuthLogin;
