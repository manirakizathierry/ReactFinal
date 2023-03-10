import { Edit } from '@mui/icons-material';
import { Box, Button, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import PropTypes from 'prop-types';
import { getUserArch } from 'api/userAPI';

const ListFunctions = ({ userSettings: { functionsUser }, setRowSelected, getUserArch }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const onEdit = (e) => {
        setRowSelected({ designation: e.designation, code: e.code, id_fonction: e.id_fonction });
    };

    useEffect(() => {
        getUserArch('fonction');
        getUserArch('tache');
    }, [getUserArch]);
    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell width="7%">
                                <FormattedMessage id="numero" />
                            </StyledTableCell>
                            <StyledTableCell width="35%">
                                <FormattedMessage id="designation" />
                            </StyledTableCell>
                            <StyledTableCell width="35%">
                                <FormattedMessage id="code" />
                            </StyledTableCell>
                            <StyledTableCell sx={{ pr: 3 }}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {functionsUser.length === 0 ? (
                            <StyledTableCell colSpan={8}>
                                <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                            </StyledTableCell>
                        ) : (
                            functionsUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indx) => (
                                <StyledTableRow hover key={indx}>
                                    <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                        {indx + 1}
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                        {row?.designation.toUpperCase()}
                                    </StyledTableCell>
                                    <StyledTableCell>{row?.code}</StyledTableCell>
                                    <StyledTableCell sx={{ pr: 3 }}>
                                        <Box sx={{ display: 'flex', margin: -1 }}>
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
                count={functionsUser.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

ListFunctions.propTypes = {
    userSettings: PropTypes.object,
    getUserArch: PropTypes.func.isRequired,
    setRowSelected: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    userSettings: state.userSettings
});

export default connect(mapStateToProps, { getUserArch })(ListFunctions);
// export default ListFunctions;
