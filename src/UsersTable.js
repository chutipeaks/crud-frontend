import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

const UsersTable = ({ rows, selectedUser, deleteUser }) => {
  return (
    <Table sx={{ minWidth: 650 }} aria-label="users table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell component="th" scope="row">{row.name}</TableCell>
           
              <TableCell>
                <Button
                  variant="outlined"
                  sx={{ margin: '0px 10px' }}
                  onClick={() => selectedUser({ id: row.id, name: row.name })}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ margin: '0px 10px' }}
                  onClick={() => deleteUser({id :row.id})}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" colSpan={3}>No Data</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
