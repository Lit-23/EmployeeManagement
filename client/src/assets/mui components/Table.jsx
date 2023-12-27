import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

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

function createData(name, designation, email, phoneNumber, address) {
  return { name, designation, email, phoneNumber, address };
}

export default function CustomizedTables() {
  // state for fetching employees collection from database
  // const [collection, setCollection] = useState({});

  // const employeeList = () => {
  //   if(collection) {
  //     collection.map((employee) => (
  //       createData(
  //         employee.firstName,
  //         employee.designation,
  //         employee.email,
  //         employee.phoneNumber,
  //         employee.address
  //       )
  //     ))
  //   }
  // };
  
  const employeeList = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream', 237, 9.0, 37, 4.3),
    // createData('asdasd', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ]
  


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(employeeList);

  const handleChangePage = (e, newpage) => {
    setPage(newpage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    let dataShown = employeeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    setData(dataShown);
  }, [page, rowsPerPage])

  // fuctionality for fetching employee's data
  // const searchEmployee = async () => {
  //   try {
  //     const res = await fetch('/api/employee/list', { method: 'GET' });
  //     const data = await res.json();
  //     setCollection(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   searchEmployee();
  // }, []);
  // console.log(collection);

  return (
    <>
      <h1 className="text-xl mb-3">Employee Lists</h1>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee) => (
              <StyledTableRow key={employee.name}>
                <StyledTableCell component="th" scope="row">{employee.name}</StyledTableCell>
                <StyledTableCell align="center">{employee.designation}</StyledTableCell>
                <StyledTableCell align="center">{employee.email}</StyledTableCell>
                <StyledTableCell align="center">{employee.phoneNumber}</StyledTableCell>
                <StyledTableCell align="center">{employee.address}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TablePagination 
            rowsPerPageOptions={[2,5,10,15]}
            count={employeeList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPage}
          />
        </Table>
      </TableContainer>
    </>
  );
}