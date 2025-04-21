import { useForm } from "react-hook-form"
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button';
const Form = ({todo, setTodo,handleClose,addOrUpdate,index})  => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({defaultValues:{
        title:"",
        tag:"else",
        completed:"false"
    }})
    const[error,setError]=React.useState("")
   
    React.useEffect(()=>{
        if(addOrUpdate==="update"){
         setValue("title",todo[index].title)
         setValue("tag",todo[index].tag)
         setValue("completed",todo[index].completed)
       
    }
 
    

    },[])
    const createNew = async (data) => {
        try {
            const res = await axios.post('http://localhost:1100/api/todo', data)
            console.log(todo)
            console.log(res.data)
            setTodo([ ...todo,res.data])


        }
        catch (err) {
            alert(err.response.data)
        }
    }
    const update=async(data,_id)=>{
        data._id=_id
        try{
            const res= await axios.put(`http://localhost:1100/api/todo/`,data)
            const tmp=todo
            console.log(res.date)
            tmp[index]=res.data
            console.log(tmp[index])
            setTodo([ ...tmp])
            
        }
        catch(err){
                setError(err.response.data)   
                alert(err.response.data)         
        }
       
        
    }
    const onSubmit = (data) => {
        console.log(data)
        addOrUpdate==="add"?createNew(data):update(data,todo[index]._id)
        handleClose()
    }

    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            
            <Stack spacing={2}>
                <TextField required id="title" label="title" variant="standard"   {...register("title" ,{required:true}) } />
                <TextField id="tag-" label="tag-(home/study/else)" variant="standard"   {...register("tag")} />
                <TextField id="complete"  label="completed" variant="standard"   {...register("completed")} />
                <Button  type="submit" variant="contained" endIcon={<SendIcon />}> Send  </Button>
            </Stack>
        </form>
        </>
     
    )


}
export default Form