import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment';

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

export default function CustomizedTables(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="sf-table">
      <div className="table-head">{props.heading}</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.headers.map(header => (
                <StyledTableCell key={header.name} align={header.align ? header.align : 'left'}>{header.name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.length > 0 && props.type === 'flight' ? (
              props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((flight, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left"><div className="on-hover">{flight._id}</div></StyledTableCell>
                  <StyledTableCell align="left">{flight.source_name}</StyledTableCell>
                  <StyledTableCell align="left">{flight.destination_name}</StyledTableCell>
                  <StyledTableCell align="left">{flight.flight_class_name}</StyledTableCell>
                  <StyledTableCell align="center">{flight.passengers_name}</StyledTableCell>
                  <StyledTableCell align="left">{moment(flight.flightDate).format('LL')}</StyledTableCell>
                  <StyledTableCell align="center">{flight.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{flight.loyaltyRewards}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : props.items.length > 0 && props.type === 'hotel' ? (
              props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hotel, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left"><div className="on-hover">{hotel._id}</div></StyledTableCell>
                  <StyledTableCell align="left">{hotel.hotel_city_name}</StyledTableCell>
                  <StyledTableCell align="left">{hotel.room_class_name}</StyledTableCell>
                  <StyledTableCell align="center">{hotel.rooms_price}</StyledTableCell>
                  <StyledTableCell align="left">{moment(hotel.check_in).format('LL')}</StyledTableCell>
                  <StyledTableCell align="left">{moment(hotel.check_out).format('LL')}</StyledTableCell>
                  <StyledTableCell align="center">{hotel.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{hotel.loyaltyRewardsUsed}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : props.items.length > 0 && props.type === 'latestFlights' ? (
                props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((flight, index) => (
                  <StyledTableRow key={index}>
                  <StyledTableCell align="left"><div className="on-hover">{flight._id}</div></StyledTableCell>
                  <StyledTableCell align="left">{flight.source_name}</StyledTableCell>
                  <StyledTableCell align="left">{flight.destination_name}</StyledTableCell>
                  <StyledTableCell align="left">{flight.flight_class_name}</StyledTableCell>
                  <StyledTableCell align="center">{flight.passengers_name}</StyledTableCell>
                  <StyledTableCell align="left">{moment(flight.flightDate).format('LL')}</StyledTableCell>
                  <StyledTableCell align="center">{flight.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{flight.loyaltyRewards}</StyledTableCell>
                  </StyledTableRow>
                ))
            ) : props.items.length > 0 && props.type === 'latestHotels' ? (
              props.items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((hotel, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left"><div className="on-hover">{hotel._id}</div></StyledTableCell>
                  <StyledTableCell align="left">{hotel.hotel_city_name}</StyledTableCell>
                  <StyledTableCell align="left">{hotel.room_class_name}</StyledTableCell>
                  <StyledTableCell align="center">{hotel.rooms_price}</StyledTableCell>
                  <StyledTableCell align="left">{moment(hotel.check_in).format('LL')}</StyledTableCell>
                  <StyledTableCell align="left">{moment(hotel.check_out).format('LL')}</StyledTableCell>
                  <StyledTableCell align="center">{hotel.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{hotel.loyaltyRewardsUsed}</StyledTableCell>
                </StyledTableRow>
              ))
              ) : (
              <StyledTableCell colSpan={8} align='center'>No bookings yet!</StyledTableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={props.items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
