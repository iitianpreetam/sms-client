import { FunctionComponent } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type DrawerMenuItemProps = {
    open: boolean;
    icon: any;
    text: string;
    onClick?: () => void;
};

const DrawerMenuItem: FunctionComponent<DrawerMenuItemProps> = ({ open, icon, text, onClick }) => {
    return (
        <ListItem
            disablePadding
            sx={{display: 'block'}}
            onClick={onClick}
        >
            <ListItemButton sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}>
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                }}>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}} />
            </ListItemButton>
        </ListItem>
    );
};

export default DrawerMenuItem;