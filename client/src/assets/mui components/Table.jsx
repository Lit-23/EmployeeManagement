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
import { useDispatch, useSelector } from 'react-redux';
import {  
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  searchEmployeeByIdStart,
  searchEmployeeByIdSuccess,
  searchEmployeeByIdFailure,
  searchEmployeeListStart,
  searchEmployeeListSuccess,
  searchEmployeeListFailure,
} from '../../store/employeeSlice/employeeSlice.js'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2e7d32',
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

export default function CustomizedTables() {
    // states & functionality for fetching data from api
  const [collection, setCollection] = useState([]);
  const { admin, loading } = useSelector(state  => state.employee);
  const dispatch = useDispatch();
  
  const searchCollection = async () => {
    try {
      dispatch(searchEmployeeListStart());
      if(loading === true) {
        Swal.showLoading();
      } else {
        Swal.hideLoading();
      };
      const res = await fetch('/api/employee/list', { method: 'GET' });
      const data = await res.json();
      dispatch(searchEmployeeListSuccess(data));
      setCollection(data);
    } catch (error) {
      dispatch(searchEmployeeListFailure(error));
      if(error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      console.log('error fetching!');
    }
  };

  useEffect(() => {
    searchCollection();
  }, [])

  // states & functionality for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(collection);

  const handleChangePage = (e, newpage) => {
    setPage(newpage);
  };
  const handleRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    let dataShown = collection.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    setData(dataShown);
  }, [page, rowsPerPage, collection])

  // functionality for deleting employee
  const handleDelete = async (event) => {
    const parentElementId = event.currentTarget.parentElement.id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then( async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployeeStart());
        const res = await fetch(`/api/employee/delete/${parentElementId}`, { method: 'DELETE' });
        const data = await res.json();
        if(res.success === false) {
          dispatch(deleteEmployeeFailure(data)); 
          return;
        }
        dispatch(deleteEmployeeSuccess());
        Swal.fire({
          title: "Deleted!",
          text: "An employee has been deleted.",
          icon: "success"
        });
        searchCollection();
      }
    });
  };

  // functionality for fetching and navigating to update employee page
  const navigate = useNavigate();
  const handleEdit = async (event) => {
    const parentElementId = event.currentTarget.parentElement.id;
    try {
      dispatch(searchEmployeeByIdStart());
      const res = await fetch(`/api/employee/find/${parentElementId}`, { method: 'POST' })
      const data = await res.json();
      if(res.success === false) {
        dispatch(searchEmployeeByIdFailure(data));
        return;
      };
      dispatch(searchEmployeeByIdSuccess(data));
      navigate('/update');
    } catch (error) {
      dispatch(searchEmployeeByIdFailure(error));
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow backgroundColor='red'>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Designation</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone Number</StyledTableCell>
              {
                admin 
                  ? <>
                      <StyledTableCell align="center">ID</StyledTableCell>
                      <StyledTableCell align="center">Options</StyledTableCell>
                    </>
                  : <StyledTableCell align="center">Address</StyledTableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((employee) => (
                <StyledTableRow key={employee._id}>
                  <StyledTableCell component="th" scope="row">{`${employee.firstName} ${employee.lastName}`}</StyledTableCell>
                  <StyledTableCell align="center">{employee.designation}</StyledTableCell>
                  <StyledTableCell align="center">{employee.email}</StyledTableCell>
                  <StyledTableCell align="center">{employee.phoneNumber}</StyledTableCell>
                  {
                    admin 
                      ? <>
                          <StyledTableCell align="center">{employee.ID}</StyledTableCell>
                          <StyledTableCell id={employee._id} align="center">
                            <button onClick={handleEdit} className='text-[#2e7d32] hover:underline duration-300'>Edit</button>
                            <span>/</span>
                            <button onClick={handleDelete} className='text-red-700 hover:underline duration-300'>Delete</button>
                          </StyledTableCell>
                        </>
                      : <StyledTableCell align="center">{employee.address}</StyledTableCell>
                  }
                </StyledTableRow>
              ))
            }
          </TableBody>
          <TablePagination 
            rowsPerPageOptions={[2,5,10,15]}
            count={collection.length}
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