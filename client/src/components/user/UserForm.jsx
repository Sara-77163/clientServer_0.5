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
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues:{
            name:"",
            userName:"",
            email:"",
            phone:"",
            city:"",
            street:"",
            building:""

        }
    })

    React.useEffect(()=>{
        if(addOrUpdate==="update"){
            setValue("name",user[index].name)
            setValue("userName",user[index].userName)
            setValue("email",user[index].email)
            setValue("phone",user[index].phone)
            setValue("city",user[index].address.city)
            setValue("street",user[index].address.street)
            setValue("building",user[index].address.building)
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
                alert(err.response.data)         
        }
       
        
    }
    

    const onSubmit = (data) => {
        console.log(data)
        addOrUpdate==="add"?createNew(data):update(data,user[index]._id)
        handleClose()
    }

    return (
        <>
         <form onSubmit={handleSubmit(onSubmit)}>
            
            <Stack spacing={2}>
                <TextField required id="name" label="name" variant="standard"  {...register("name",{required:true})} />
                <TextField required id="userName" label="useName" variant="standard"   {...register("userName",{required:true})} />
                <TextField id="email" label="email" variant="standard"   {...register("email")} />
                <TextField id="phone" label="phone" variant="standard"   {...register("phone")} />
                <TextField id="city" label="city" variant="standard"   {...register("city")} />
                <TextField id="street" label="steet" variant="standard"  {...register("street")} />
                <TextField id="building" label="building" variant="standard"   {...register("building")} />
                <Button  type="submit" variant="contained" endIcon={<SendIcon />}> Send  </Button>
            </Stack>

        </form>
       
        </>
       
    )


}
export default UserForm