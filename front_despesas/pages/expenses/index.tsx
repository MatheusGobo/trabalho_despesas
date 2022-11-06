import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useEffect, useState } from "react";
import ExpenseService from "../../src/services/ExpenseService";
import FormDialog from '../../src/components/FormExpense';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { Container, Grid, Typography } from '@mui/material';
import FormExpense from '../../src/components/FormExpense';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Category {
  id: number;
  name: string;
  update_at: string;
}

interface Expense {
  id: number;
  name: string;
  price: number;
  category: Category;
  updated_at: string;
}

interface ExpenseProps {
  name: string;
  price: number;
  category_id: number;
}


function CategorieList() {

  const [open, setOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const getExpenses = async () => {
    let data = await ExpenseService.getAll()

    setExpenses(data)
  }

  useEffect(() => {
    getExpenses().then(() => {
      setIsLoading(false)
    })

  }, [])

  const deleteExpense = (expense: Expense) => {

    var result = confirm(`Você realmente gostaria de deletar a categoria: ${expense.name}`)

    if (!result) return

    setIsLoading(true);
    ExpenseService.destroy(expense.id).then((data) => {
      getExpenses().then(() => {
        setIsLoading(false)

        toast.success('Expense destroyled Success')
      }).catch((e) => {
        setIsLoading(false)

        toast.error('Error delete Expense');
      })
    })
  }

  const insertExpense = (expense: ExpenseProps) => {
    ExpenseService.create(expense)
      .then((data) => {
        getExpenses().then(() => {
          setIsLoading(false)
          toast.success('Expense Create Success')
          handleClose
        })
      }).catch((e) => {
        setIsLoading(false)
        toast.error('Error to create Expense');
        handleClose
      })
  }

  if (isLoading) return <p>Carregando</p>

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Grid container mt={2}>
          <Grid item xs={6} mb={4}>
            <Typography
              variant="h4"
            >
              Expenses List
            </Typography>
          </Grid>
          <Grid container mb={2}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
            >

              Registrar Nova Saída
            </Button>
          </Grid>
          <FormExpense
              onInputValueChange={insertExpense} 
              handleClickOpen={handleClickOpen} 
              handleClose={handleClose}
              value={open} />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Last Modified</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  expenses.map((expense: Expense) => (
                    <StyledTableRow key={expense.id} >
                      <StyledTableCell align="center">{expense.id}</StyledTableCell>
                      <StyledTableCell align="left">{expense.name}</StyledTableCell>
                      <StyledTableCell align="left">{expense.price}</StyledTableCell>
                      <StyledTableCell align="left">{expense.updated_at}</StyledTableCell>
                      <StyledTableCell align="left">{expense.category.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="contained" href="#contained-buttons" color="error" size="small" onClick={() => deleteExpense(expense)}>
                          <DeleteForeverIcon fontSize="small" />Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </>
  )
}

export default CategorieList;