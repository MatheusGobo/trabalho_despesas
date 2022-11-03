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
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";

// ROTA
import ROUTES from "../../src/config/routes";

// IMPORTAÇÕES SERVICES
import ExpenseService from '../services/ExpenseService';
import CategoryService from '../services/CategoryService';

interface Category{
  id: number;
  name: string;
}

interface Expense {
  name: string;
  price: number;
  category_id: number;
}


export default function FormDialog() {
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

    console.log({ email: formData.get("name"), password: formData.get("category") });

    const expense: Expense = { 
          name: String(data.name), 
          price: Number(data.price), 
          category_id: Number(data.category)
        };

    console.log(expense);    
    insertExpense(expense);
  };

         
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data))
  }, []);

 
  const insertExpense = (expense: Expense) => {
    ExpenseService.create(expense).then((data) => {
      router.push(ROUTES.expenses.list)
    }).catch((e) => console.error(e))
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Registrar Nova Saída
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Saida</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            >
          <TextField
            margin="normal"
            className="field"
            autoFocus
            id="name"
            name="name"
            label="Descrição Saida"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="normal"
            className="field"
            autoFocus
            id="price"
            name="price"
            label="Valor"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
          margin="normal"
          id="category"
          name="category"
          select
          label="Categoria"
          value={category}
          onChange={handleChange}
          fullWidth
          >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
          </TextField>
          <DialogActions>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClose}
            >
              Cadastrar Saida
            </Button>
          </DialogActions>
        </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}