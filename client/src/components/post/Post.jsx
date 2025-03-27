
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
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import AddUpdatePost from "./AddUpdatePost";


const Post = () => {
    const [post, setPost] = useState([])
    const [deleted, setDeleted] = useState(false)
    async function fetchData() {
        try {
            const res = await axios.get('http://localhost:1100/api/post')
            setPost(res.data)
        }

        catch (err) {
            alert(err.response.data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [deleted])
    const deleteTodo = async (_id) => {

        try {
            const res = await axios.delete(`http://localhost:1100/api/post/${_id}`)
            setDeleted(!deleted)
        }
        catch (err) {
            alert(err.response.data)
        }
        post.sort((elem1,elem2)=>elem1._id>elem2._id)


    }
    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%' }}>
                {post.map((elem, index) => {
                    return (
                        <ListItem key={elem._id}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid size={12}>
                                    <ListItemAvatar>
                                        <Avatar style={{ backgroundColor: "gray" }}>
                                            <DescriptionIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={elem.title} secondary={elem.body} />
                                </Grid>
                                <Grid size={12}>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={1}
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>

                                        <AddUpdatePost post={post} setPost={setPost} icon={<EditIcon />} addOrUpdate={"update"} index={index} />
                                        <Fab color="secondary" aria-label="delete" onClick={() => { deleteTodo(elem._id) }}><DeleteIcon /> </Fab>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )
                })
                }
            </List>
            <AddUpdatePost post={post} setPost={setPost} icon={<AddIcon />} addOrUpdate={"add"} index={0} />
        </>

    )


}
export default Post 