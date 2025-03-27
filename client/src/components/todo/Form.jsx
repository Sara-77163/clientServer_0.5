import { useForm } from "react-hook-form"
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const Form = ({todo, setTodo,handleClose,addOrUpdate,index})  => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
   
    const[titleDefault,setTitleDefault]=React.useState("")
    const [tag,setTag]=React.useState("else")
    const [complete,setComplete]=React.useState(false)
    const[error,setError]=React.useState("")
   
    React.useEffect(()=>{
        if(addOrUpdate==="update"){
         setTitleDefault(todo[index].title)
         setTag(todo[index].tag)
         setComplete(todo[index].completed)
       
    }
 
    

    },[titleDefault,tag,complete])
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
                <TextField required id="title" label="title" variant="standard" defaultValue={titleDefault} onChange={e => setTitleDefault(e.target.value)}  {...register("title") } />
                <TextField id="tag-" label="tag-(home/study/else)" variant="standard" defaultValue={tag}  {...register("tag")} />
                <TextField id="complete"  label="completed" variant="standard" defaultValue={complete}  {...register("completed")} />
                <Button  type="submit" variant="contained" endIcon={<SendIcon />}> Send  </Button>
            </Stack>
        </form>
        </>
     
    )


}
export default Form