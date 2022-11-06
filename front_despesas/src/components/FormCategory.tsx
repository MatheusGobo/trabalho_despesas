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
import { Grid } from "@mui/material";

interface Category{
  name: string;
}

interface CategoryProps {
  onInputValueChange(category: Category): void;
  value: boolean;
  handleClickOpen(): void;
  handleClose(): void;
}

export default function FormCategory(props: CategoryProps) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
   

    const category: Category = { 
          name: String(data.name)
        };
 
    props.onInputValueChange(category);
    props.handleClickOpen();
  };
         
  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data))
  }, []);

  return (
    <div>
      <Dialog open={props.value} onClose={props.handleClose}>
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
