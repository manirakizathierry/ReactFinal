import { Edit } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import PropTypes from 'prop-types';
import { getUserArch } from 'api/userAPI';
import UIProgress from 'views/ui-elements/advance/UIProgress';

const ListDepartment = ({ userSettings: { departments }, setRowSelected, getUserArch }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const dispatch = useDispatch();
    const onEdit = (e) => {
        setRowSelected(e);
    };

    useEffect(() => {
        getUserArch('departement');
    }, []);
    return (
        <Box>
            {departments.length === 0 && <UIProgress />}
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width={80}>
                                <FormattedMessage id="numero" />
                            </StyledTableCell>
                            <StyledTableCell width="80%">
                                <FormattedMessage id="designation" />
                            </StyledTableCell>
                            <StyledTableCell sx={{ pr: 3 }} align="center">
                                Action
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.length === 0 ? (
                            <StyledTableCell colSpan={8}>
                                <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                            </StyledTableCell>
                        ) : (
                            departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, ind) => (
                                <StyledTableRow hover key={ind}>
                                    <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                        {ind + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row?.designation.charAt(0).toUpperCase() + row?.designation.slice(1)}
                                    </StyledTableCell>
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={departments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

ListDepartment.propTypes = {
    userSettings: PropTypes.object,
    getUserArch: PropTypes.func.isRequired,
    setRowSelected: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    userSettings: state.userSettings
});

export default connect(mapStateToProps, { getUserArch })(ListDepartment);
