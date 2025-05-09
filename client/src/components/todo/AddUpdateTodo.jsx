
import { Fab } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from "./Form";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddUpdateTodo = ({todo, setTodo,icon,addOrUpdate, index}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => setOpen(false);
  
  return (
    <>
      <div>
        <Fab color="secondary" aria-label="add" onClick={handleOpen}>
          {icon}
       </Fab>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {addOrUpdate}  todo
            </Typography>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <Form todo={todo} setTodo={setTodo} handleClose={handleClose} addOrUpdate={addOrUpdate}index={index}/>
            </div>
          </Box>
        </Modal> 
      </div> 
    </>
  )

}
export default AddUpdateTodo