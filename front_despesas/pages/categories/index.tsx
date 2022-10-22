import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Link from "next/link";
import { useEffect, useState } from "react";
import ROUTES from "../../src/config/routes";
import CategorieService from "../../src/services/CategorieService";
//import { toast } from 'react-toastify';


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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

function CategorieList() {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    let data = await CategorieService.getAll()

    setCategories(data)
  }

  useEffect(() => {
    getCategories().then(() => {
      setIsLoading(false)
    })

  }, [])

  const deleteCategorie = (categorie) => {

    var result = confirm(`Você realmente gostaria de deletar a categoria: ${categorie.name}`)

    if (!result) return

    setIsLoading(true);
    CategorieService.destroy(categorie.id).then((data) => {
      getCategories().then(() => {
        setIsLoading(false)
        console.log('Categorie destroyled Success')

        //toast.success('Categorie destroyled Success')
      }).catch((e) => {
        console.error(e)
        //toast.error('Error delete Categorie');
      })
    })
  }


  if (isLoading) return <p>Carregando</p>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              categories.map((categorie) => (
                <StyledTableRow key={categorie.id} >
                  <StyledTableCell align="center">{categorie.id}</StyledTableCell>
                  <StyledTableCell align="left">{categorie.name}</StyledTableCell>
                  <StyledTableCell align="right"><Button variant="contained" href="#contained-buttons" color="error" size="small"><DeleteForeverIcon fontSize="small" />Delete</Button></StyledTableCell>
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CategorieList;