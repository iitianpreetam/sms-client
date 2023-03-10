import { FunctionComponent, ReactNode, useState } from "react";
import Head from "next/head";
import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from 'react-toastify';

import Navbar from "@/components/Navbar";
import LeftDrawer, { DrawerHeader } from "@/components/LeftDrawer";

import 'react-toastify/dist/ReactToastify.css';

export interface LayoutProps {
    title?: string;
    content?: string;
    children: ReactNode
}
export const drawerWidth = 240;

const Layout: FunctionComponent<LayoutProps> = ({
    title = 'Home | SMS',
    content = 'Students Management System',
    children
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta content={content}/>
            </Head>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
                <LeftDrawer handleDrawerClose={handleDrawerClose} open={open} />
                <Box component="main" sx={{ flexGrow: 1, px: 3, py:2 }}>
                    <DrawerHeader />
                    <ToastContainer />
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default Layout;