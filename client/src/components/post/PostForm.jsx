import { useForm } from "react-hook-form"
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const PostForm = ({post, setPost,handleClose,addOrUpdate,index})  => {
    const[titleDefault,setTitleDefault]=React.useState("")
    const [body,setBody]=React.useState("")
    const[error,setError]=React.useState("")
    React.useEffect(()=>{
        if(addOrUpdate==="update"){
            setTitleDefault(post[index].title)
            setBody(post[index].body)
        }
        else{
            setTitleDefault("")
            setBody("")    
        }

    },[])
    const createNew = async (data) => {
        try {
            const res = await axios.post('http://localhost:1100/api/post', data)
            console.log(post)
            console.log(res.data)
            setPost([ ...post,res.data])
        }
        catch (err) {
            console.error('Error creating new todo:', err.data);
            alert(err.data)
        }
    }
    const update=async(data,_id)=>{
        data._id=_id
        try{
            const res= await axios.put(`http://localhost:1100/api/post/`,data)
            const tmp=post
            console.log(res.date)
            tmp[index]=res.data
            console.log(tmp[index])
            setPost([ ...tmp])
            
        }
        catch(err){
                setError(err.response.data)   
                alert(err.response.data)         
        }
       
        
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        addOrUpdate==="add"?createNew(data):update(data,post[index]._id)
        handleClose()
    }

    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            
            <Stack spacing={2}>
                <TextField required id="title" label="title" variant="standard" defaultValue={titleDefault}   {...register("title")} />
                <TextField id="body" label="body" variant="standard" defaultValue={body}  {...register("body")} />
                <Button  type="submit" variant="contained" endIcon={<SendIcon />}> Send  </Button>
            </Stack>

        </form>
        {error&&<Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}.
      </Alert>}
        </>
       
    )


}
export default PostForm