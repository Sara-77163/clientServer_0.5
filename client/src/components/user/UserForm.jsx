import { useForm } from "react-hook-form"
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const UserForm = ({user, setUser,handleClose,addOrUpdate,index})  => {
    const[name,setName]=React.useState("")
    const [userName,setUserName]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [phone,setPhone]=React.useState("")
    const[error,setError]=React.useState("")
    React.useEffect(()=>{
        if(addOrUpdate==="update"){
            setName(user[index].name)
            setUserName(user[index].userName)
            setEmail(user[index].email)
            setPhone(user[index].email)
        }
        else{
            setName("")
            setUserName("")
            setEmail("") 
            setPhone("")

        }

    },[])
    const createNew = async (data) => {
        try {
            const res = await axios.post('http://localhost:1100/api/user', data)
            console.log(res.data)
            setUser([ ...user,res.data])
        }
        catch (err) {
            console.error('Error creating new todo:', err.data);
            alert(err.response.data)
        }
    }
    const update=async(data,_id)=>{
        data._id=_id
        try{
            const res= await axios.put(`http://localhost:1100/api/user/`,data)
            const tmp=user
            console.log(res.date)
            tmp[index]=res.data
            console.log(tmp[index])
            setUser([ ...user])
            
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
        addOrUpdate==="add"?createNew(data):update(data,user[index]._id)
        handleClose()
    }

    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            
            <Stack spacing={2}>
                <TextField required id="name" label="name" variant="standard" defaultValue={name}   {...register("name")} />
                <TextField required id="userName" label="useName" variant="standard" defaultValue={userName}  {...register("userName")} />
                <TextField id="email" label="email" variant="standard" defaultValue={email}  {...register("email")} />
                <TextField id="phone" label="phone" variant="standard" defaultValue={phone}  {...register("phone")} />
                <TextField id="city" label="city" variant="standard" defaultValue={""}  {...register("city")} />
                <TextField id="street" label="steet" variant="standard" defaultValue={""}  {...register("street")} />
                <TextField id="building" label="building" variant="standard" defaultValue={""}  {...register("building")} />
                <Button  type="submit" variant="contained" endIcon={<SendIcon />}> Send  </Button>
            </Stack>

        </form>
       
        </>
       
    )


}
export default UserForm