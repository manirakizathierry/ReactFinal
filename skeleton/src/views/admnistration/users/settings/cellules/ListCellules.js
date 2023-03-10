import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'utils/tools';

const ListCellules = ({ setRowSelected }) => {
    const dispatch = useDispatch();
    const { departments, services } = useSelector((state) => state.userSettings);
    const onEdit = (e) => {
        setRowSelected(e);
    };
    const onDelete = (e) => {
        const servicess = services.slice();
        const newArr = [];
        servicess.forEach((d) => {
            if (d.id !== e.id) {
                newArr.push(d);
            }
        });
        dispatch({ type: 'USER@SERVICES', servicesList: newArr });
    };
    console.log(services);
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell width={80}>
                            <FormattedMessage id="numero" />
                        </StyledTableCell>
                        <StyledTableCell width={250}>
                            <FormattedMessage id="entitled" />
                        </StyledTableCell>
                        <StyledTableCell width={250}>
                            <FormattedMessage id="departments" />
                        </StyledTableCell>
                        <StyledTableCell sx={{ pr: 3 }}>Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map((row, indx) => (
                        <StyledTableRow hover key={indx}>
                            <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                {indx + 1}
                            </StyledTableCell>
                            <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                {row.entitled}
                            </StyledTableCell>
                            <StyledTableCell>{departments.filter((d) => d.id === row.idDepartment)[0].name}</StyledTableCell>
                            <StyledTableCell sx={{ pr: 3 }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton
                                        onClick={() => {
                                            onEdit(row);
                                        }}
                                        size="small"
                                    >
                                        <Edit sx={{ fontSize: '1rem' }} />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(row)} size="small" color="error">
                                        <Delete sx={{ fontSize: '1rem' }} />
                                    </IconButton>
                                </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListCellules;
