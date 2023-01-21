import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';

import { logoutThunk } from '@/features/authSlice';

import { drawerWidth } from '@/hocs/Layout';
import { IconButton } from '@mui/material';
import DrawerMenuItem from './DrawerMenuItem';

type DrawerProps = {
    open: boolean;
    handleDrawerClose: () => void;
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

const LeftDrawer: FunctionComponent<DrawerProps> = ({open, handleDrawerClose}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const theme = useTheme();
    const notify = (msg: string) => {
        toast(msg, {
            toastId: 'logoutPage'
        })
    }

    const handleLogout = async () => {
        try{
            const res = await dispatch(logoutThunk()).unwrap();
            setTimeout(() => {
                notify(res);
            }, 1000);
            router.push('/auth/login');
        } catch(err: any) {
            notify(err.error);
        }
    }
    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                    {open && <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <DrawerMenuItem 
                        key={index}
                        open={open}
                        icon={index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        text={text}
                    />
                ))}
                <Divider />
                <DrawerMenuItem
                    open={open}
                    icon={<LogoutIcon />}
                    text='Logout'
                    onClick={handleLogout}
                />
            </List>
        </Drawer>
    );
};

export default LeftDrawer;