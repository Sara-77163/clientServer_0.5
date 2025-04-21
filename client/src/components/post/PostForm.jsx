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
    const[error,setError]=React.useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
        control, 
        setValue 
    } = useForm({
        defaultValues: {
            title:"",
            body:""
        },
    }
        
    )
    React.useEffect(()=>{
        if(addOrUpdate==="update"){
            setValue("title", post[index].title); 
            setValue("body", post[index].body);   
        }
        else{
            setValue("title", ""); 
            setValue("body", "");  
  
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
   

    const onSubmit = (data) => {
        console.log(data)
        addOrUpdate==="add"?createNew(data):update(data,post[index]._id)
        handleClose()
    }

    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            
            <Stack spacing={2}>
                <TextField required id="title" label="title" variant="standard"    {...register("title",{required:true})} />
                <TextField id="body" label="body" variant="standard"   {...register("body")} />
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