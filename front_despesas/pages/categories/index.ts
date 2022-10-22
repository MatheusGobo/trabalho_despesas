import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    <TableContainer component= { Paper } >
    <Table sx={ { minWidth: 700 } } aria - label="customized table" >
      <TableHead>
      <TableRow>
      <StyledTableCell align="center" > ID < /StyledTableCell>
        < StyledTableCell align = "right" > Name < /StyledTableCell>
          < /TableRow>
          < /TableHead>
          <TableBody>
  {
    categories.map((categorie) => (
      <StyledTableRow key= { categorie.id } >
      <StyledTableCell align="right" > { categorie.id } < /StyledTableCell>
    < StyledTableCell align = "right" > { categorie.name } < /StyledTableCell>
    < /StyledTableRow>
    ))
  }
  </TableBody>
    < /Table>
    < /TableContainer>
   )
}

export default CategorieList;