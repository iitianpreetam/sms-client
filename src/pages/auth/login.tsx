import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { loginThunk } from '@/features/authSlice';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppDispatch } from '@/store';
import { LoginFormData } from '@/types/app-types';

import 'react-toastify/dist/ReactToastify.css';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="sms-delta.vercel.app">
            SMS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const theme = createTheme();

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const notify = (msg: string) => {
        toast(msg, {
            toastId: 'loginPage'
        })
    }
    const [formData, setFormData] = React.useState<LoginFormData>({username: '', password: ''});
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await dispatch(loginThunk(formData)).unwrap();
            if(res.success) {
                setTimeout(() => {
                    notify('Authenticated Successfully!');
                }, 1000);
                router.push('/');
                setIsLoading(false);
            };
        } catch(err: any) {
            notify(err.error);
            setIsLoading(false);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={onChange}
                            value={formData.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={onChange}
                            value={formData.password}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size='large'
                            startIcon={isLoading && <CircularProgress size={20} sx={{mr: 1}} color='inherit' />}
                        >
                            {!isLoading ? 'Login' : 'Logging In...'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;