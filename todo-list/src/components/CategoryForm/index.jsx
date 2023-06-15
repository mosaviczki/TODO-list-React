import { useEffect, useState } from 'react';
import {Button, Dialog} from '@mui/material';
import {DialogContent, DialogTitle} from '@mui/material';

export default function CategoryForm(props) {
  const [name, setName] = useState("");
  const {openDialog, setOpenDialog} = props;
  
  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(()=>{
    localStorage.setItem("selectCategory", JSON.stringify(name))
    }, [name]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name){
      return
    }
    props.addCategory(name);
  }

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Nova Categoria</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <input type='text' onChange={(e) => setName(e.target.value)}/>
            <Button type='submit' onClick={handleClose}>Ok</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
