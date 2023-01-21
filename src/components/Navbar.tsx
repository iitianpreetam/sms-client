import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { RootState } from '@/store';

import { drawerWidth } from '@/hocs/Layout';
import { User } from '@/types/app-types';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    handleDrawerOpen?: () => void;
}

const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Navbar: FunctionComponent<AppBarProps> = ({
    open,
    handleDrawerOpen
}) => {
    const user = useSelector<RootState>(state => state.auth.user);
    return (
        <AppBar
            position="fixed"
            color='transparent'
            elevation={1}
            open={open}
            sx={{
                backdropFilter: 'blur(10px)'
            }}
        >
            <Toolbar sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Students Management System
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Avatar>
                        {(user as any)?.first_name[0]+(user as any)?.last_name[0]}
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;