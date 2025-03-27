
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DoneIcon from '@mui/icons-material/Done';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SignalWifiStatusbarNullIcon from '@mui/icons-material/SignalWifiStatusbarNull';
import HomeIcon from '@mui/icons-material/Home'; import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import MenuIcon from '@mui/icons-material/Menu';

;

const Layot = () => {
    const [open, setOpen] = React.useState(false);
    const [links, setLinks] = React.useState(['Home', 'Todo', 'Posts', 'Album', 'User'])
    const navigate = useNavigate()
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const HundeleOnclick = (index) => {
        switch (index) {
            case 0:
                navigate("/")
                return;
            case 1:
                navigate("todo")
                return;
            case 2:
                navigate("posts")
                return;
            case 3:
                navigate("album")
                return;
            case 4:
                navigate("users")
                return;
        }



    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {links.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => { HundeleOnclick(index) }}>
                            <ListItemIcon>
                                {index === 0 ? <HomeIcon /> :
                                    index === 1 ? (
                                        <DoneIcon />
                                    ) : index === 2 ? (
                                        <LibraryBooksIcon />
                                    ) : index === 3 ? (
                                        <AutoStoriesIcon />
                                    ) : index === 4 ? (
                                        <PersonOutlineIcon />
                                    ) : (
                                        <SignalWifiStatusbarNullIcon />
                                    )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={2}>
                        <Button style={{color:'black' }}onClick={toggleDrawer(true)}><MenuIcon fontSize="large"/></Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </Grid>
                    <Grid size={10}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
export default Layot
