
import { useEffect, useState } from "react"
import * as React from 'react';
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddUpdateUser from "./AddUpdateUser";



const User = () => {
    const [user, setUser] = useState([])
    const [deleted, setDeleted] = useState(false)
    async function fetchData() {
        try {
            const res = await axios.get('http://localhost:1100/api/user')
            setUser(res.data)
        }

        catch (err) {
            alert(err.response.data)
        }
        
        user.sort((elem1,elem2)=>elem1._id>elem2._id)
    }
    useEffect(() => {
        fetchData()
    }, [deleted])
    const deleteTodo = async (_id) => {

        try {
            const res = await axios.delete(`http://localhost:1100/api/user/${_id}`)
            setDeleted(!deleted)
        }
        catch (err) {

            alert(err.response.data)
        }

    }
    return (
        <>
         <Stack direction="row" spacing={2}>
         <AddUpdateUser user={user} setUser={setUser} icon={<PersonAddAltIcon />} addOrUpdate={"add"} index={0} />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%' }}>
                {user.map((elem, index) => {
                    return (
                        <ListItem key={elem._id}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid size={12}>
                                    <ListItemAvatar>
                                        <Avatar style={{ backgroundColor: "gray" }}>
                                            <PersonOutlineIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={elem.name} secondary={`${elem.userName} ${elem._id}`} />
                                </Grid>
                                <Grid size={12}>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={1}
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>

                                        <AddUpdateUser user={user} setUser={setUser} icon={<EditIcon />} addOrUpdate={"update"} index={index} />
                                        <Fab color="secondary" aria-label="delete" onClick={() => { deleteTodo(elem._id) }}><DeleteIcon /> </Fab>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                })
                }
            </List>
            </Stack>
        </>

    )


}
export default User 