import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { StyledTableCell, StyledTableRow } from 'utils/tools';

const rowss = [
    { id_departement: 1, designation: 'finance', id_agence: 19 },
    { id_departement: 2, designation: 'comptabilite', id_agence: 19 },
    { id_departement: 3, designation: 'administration', id_agence: 19 },
    { id_departement: 4, designation: 'technique', id_agence: 19 },
    { id_departement: 10, designation: 'restauration', id_agence: 19 },
    { id_departement: 13, designation: 'don nermed', id_agence: 19 },
    { id_departement: 14, designation: 'Reception', id_agence: 19 }
];

const ListAgences = ({ setRowSelected }) => {
    const agences = useSelector((state) => state.userSettings.agences);
    console.log('aneces====>>>', agences);
    const dispatch = useDispatch();
    const onEdit = (e) => {
        setRowSelected(e);
    };
    // console.log(agences);
    // const onDelete = (e) => {
    //     const agencess = agences.slice();
    //     const newArr = [];
    //     agencess.forEach((d) => {
    //         if (d.id_agence !== e.id_agence) {
    //             newArr.push(d);
    //         }
    //     });
    //     dispatch({ type: 'USER@AGENCES', agencesList: newArr });
    // };
    return (
        <Box sx={{ height: 300, overflowY: 'scroll' }}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width={80}>
                                <FormattedMessage id="numero" />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                                <FormattedMessage id="designation" />
                            </StyledTableCell>
                            <StyledTableCell width={250}>
                                <FormattedMessage id="society" />
                            </StyledTableCell>
                            <StyledTableCell width={250}>
                                <FormattedMessage id="address" />
                            </StyledTableCell>
                            <StyledTableCell sx={{ pr: 3 }}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {agences.map((row, ind) => (
                            <StyledTableRow hover key={ind}>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    {ind + 1}
                                </StyledTableCell>
                                <StyledTableCell>{row.designation}</StyledTableCell>
                                <StyledTableCell>{row.societe}</StyledTableCell>
                                <StyledTableCell>{row.adresse}</StyledTableCell>
                                <StyledTableCell sx={{ pr: 3 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Button
                                            onClick={() => {
                                                onEdit(row);
                                            }}
                                            size="small"
                                            variant="container"
                                            color="info"
                                            startIcon={<Edit sx={{ fontSize: '1rem' }} />}
                                        >
                                            <FormattedMessage id="edit" />
                                        </Button>
                                        {/* <IconButton onClick={() => onDelete(row)} size="small" color="error">
                                            <Delete sx={{ fontSize: '1rem' }} />
                                        </IconButton> */}
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListAgences;
