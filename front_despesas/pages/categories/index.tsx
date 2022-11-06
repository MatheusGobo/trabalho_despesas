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
import CategoryService from "../../src/services/CategoryService";
import FormCategory from '../../src/components/FormCategory';
import { toast } from 'react-toastify';
import { Box, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';


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
  updated_at: string;
}

interface CategoryProps {
  name: string;
}

function CategorieList() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    let data = await CategoryService.getAll()

    setCategories(data)
  }

  useEffect(() => {
    getCategories().then(() => {
      setIsLoading(false)
    })

  }, [])

  const deleteCategory = (category: Category) => {

    var result = confirm(`Você realmente gostaria de deletar a categoria: ${category.name}`)

    if (!result) return

    setIsLoading(true);

    CategoryService.destroy(category.id)
      .then((data) => {
        getCategories().then(() => {
          setIsLoading(false)
          toast.success('Category destroyled Success')
        })
      })
      .catch((e) => {
        setIsLoading(false)
        toast.error('Error delete Category');
      })
  }

  const insertCategory = (category: CategoryProps) => {
    CategoryService.create(category)
      .then((data) => {
        getCategories().then(() => {
          setIsLoading(false)
          toast.success('Category Create Success')
          handleClose()
        })
      }).catch((e) => {
        setIsLoading(false)
        toast.error('Error to create Category');
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <p>Carregando</p>

  return (
    <>
      <Container>
        <Grid container mt={2}>
          <Grid item xs={6} mb={4}>
            <Typography
              variant="h4"
            >
              Categories List
            </Typography>
          </Grid>
          <Grid container mb={2}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
            >

              Registrar Nova Categoria
            </Button>
          </Grid>
          <FormCategory 
              onInputValueChange={insertCategory} 
              handleClickOpen={handleClickOpen} 
              handleClose={handleClose}
              value={open} />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Last Modified</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  categories.map((category) => (
                    <StyledTableRow key={category.id} >
                      <StyledTableCell align="center">{category.id}</StyledTableCell>
                      <StyledTableCell align="left">{category.name}</StyledTableCell>
                      <StyledTableCell align="left">{category.updated_at}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Button variant="contained" href="#contained-buttons" color="error" size="small" onClick={() => deleteCategory(category)}>
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