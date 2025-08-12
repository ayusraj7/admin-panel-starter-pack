'use client';

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../theme/ThemeProvider';
import ThemeToggle from '../ThemeToggle';
import { Tooltip } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useRouter, usePathname } from 'next/navigation';
import { PermScanWifiSharp } from '@mui/icons-material';

const drawerWidth = 240;

// Props for AppBar so it knows if Drawer is open
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

// Navigation items for sidebar
const mainListItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Roles & Permissions', icon: <PermScanWifiSharp />, path: '/roles' },
];

/* 
AppBar: The top navigation bar in MUI.
We style it so it matches the Drawer (sidebar) background and remove the bottom border/shadow.
*/
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none', // remove shadow
    backgroundColor:
        theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : theme.palette.background.paper, // match Drawer exactly
    backgroundImage: 'none', // remove gradient or overlay
    WebkitBackdropFilter: 'none', // remove blur effect
    backdropFilter: 'none',       // remove any transparency overlay
    color:
        theme.palette.mode === 'light'
            ? theme.palette.primary.contrastText
            : theme.palette.text.primary,
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


/*
Drawer: The left sidebar in MUI.
We style it so it matches AppBar background and remove top/bottom borders.
*/
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            backgroundColor:
                theme.palette.mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.background.paper, // match AppBar
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.primary.contrastText
                    : theme.palette.text.primary,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            border: 'none', // removes border around Drawer
            '& .MuiListItemIcon-root': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.primary.contrastText
                        : 'inherit',
            },
            '& .MuiIconButton-root': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.primary.contrastText
                        : 'inherit',
            },
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    })
);

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(true);
    const { mode } = useTheme(); // light/dark mode
    const router = useRouter();
    const pathname = usePathname();

    // Get current page name based on route
    const pageName = mainListItems?.find((item) => item?.path === pathname)?.text;

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Top AppBar */}
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"

                        onClick={toggleDrawer}
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ px: 3, width: '100%' }}>
                        {pageName}
                    </Typography>
                    <ThemeToggle />
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer variant="permanent" open={open}>
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Logo + Close Button */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minHeight: 64,
                            px: 2,
                        }}
                    >
                        {open && (
                            <Typography variant="h6" noWrap component="div">
                                Logo
                            </Typography>
                        )}
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>

                    {/* Navigation Items */}
                    <List component="nav" sx={{ flexGrow: 1 }}>
                        {mainListItems.map((item) => (
                            <ListItem
                                onClick={() => {
                                    router.push(item?.path);
                                }}
                                key={item.text}
                                disablePadding
                                sx={{ display: 'block' }}
                            >
                                <Tooltip
                                    title={item?.text}
                                    arrow
                                    placement="top"
                                    sx={{
                                        '& .MuiTooltip-arrow': { color: '#1976d2' },
                                        '& .MuiTooltip-tooltip': {
                                            backgroundColor: '#1976d2',
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            sx={{ opacity: open ? 1 : 0 }}
                                        />
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>

                    {/* Logout Button */}
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: !open ? 'center' : 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip
                            title="LogOut"
                            arrow
                            placement="top"
                            sx={{
                                '& .MuiTooltip-arrow': { color: '#1976d2' },
                                '& .MuiTooltip-tooltip': {
                                    backgroundColor: '#1976d2',
                                    fontSize: '0.875rem',
                                },
                            }}
                        >
                            <IconButton
                                onClick={() => router.push('/login')}
                                sx={{ color: 'inherit' }}
                            >
                                <LogoutRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Drawer>

            {/* Page Content */}
            <Box
                component="main"
                sx={{
                    backgroundColor: mode === 'light' ? '#f5f5f5' : '#121212',
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    pt: 8,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
