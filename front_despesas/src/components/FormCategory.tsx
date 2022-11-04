//import * as React from 'react';
//IMPORTAÇÕES REACT
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
//import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

//IMPORTAÇÕES MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";

// IMPORTAÇÕES SERVICES
import CategoryService from '../services/CategoryService';

interface Category{
  name: string;
}

interface CategoryProps {
  onInputValueChange(category: Category): void;
}

export default function FormCategory(props: CategoryProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
   

    const category: Category = { 
          name: String(data.name)
        };
 
    props.onInputValueChange(category);
    setOpen(false);
  };
         
  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data))
  }, []);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Registrar Nova Categoria
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Categoria</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            >
          <TextField
            margin="normal"
            className="field"
            autoFocus
            id="name"
            name="name"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <DialogActions>
          <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Cadastrar Categoria
            </Button>
          </DialogActions>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
