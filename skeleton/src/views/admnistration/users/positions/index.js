import React, { useState, useEffect } from 'react';
// material-ui
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Grid,
    Stack,
    Button,
    Checkbox,
    Switch,
    TablePagination
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Delete, Edit } from '@mui/icons-material';
import { gridSpacing } from 'store/constant';
import PropTypes from 'prop-types';

// asset
import AddIcon from '@mui/icons-material/AddTwoTone';
import { StyledTableCell, StyledTableRow } from 'utils/tools';
import { useSelector, connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { deleteAffectation, getAffectation } from 'api/userAPI';
import CreatePosition from './CreatePosition';
import moment from 'moment';

// ==============================|| TABLE - CUSTOMIZED ||============================== //

const PositionList = ({ affectation: { affectations }, user: { users }, deleteAffectation }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    // const affectations = useSelector((state) => state.affectation.affectations);
    const { departments, services, functionsUser } = useSelector((state) => state.userSettings);
    const [rows, setRows] = useState([{ name: '', surname: '', dateDebut: '', fonction: '' }]);
    const [affectationUser, setAffectationUser] = useState({
        idUtilisateur: '',
        idFonction: '',
        idDepartement: '',
        idService: '',
        idAgence: '',
        dateDebut: moment().format('YYYY-MM-DD')
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = (aff) => {
        if (aff) {
            const idServ = functionsUser.filter((fu) => fu.id_fonction === aff.idFonction)[0]?.id_service;
            const idDep = idServ ? services.filter((sv) => sv.id_service === aff.idService)[0]?.id_departement : 0;
            const idAgence = departments.filter((sv) => sv.id_service === aff.idService)[0]?.id_agence;
            setAffectationUser({
                idUtilisateur: aff.idUtilisateur,
                idAgence,
                idDepartement: idDep,
                idService: idServ,
                idFonction: aff.idFonction,
                dateDebut: aff.dateDebut.toISOString().slice(0, 10)
            });
        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setAffectationUser({
            idUtilisateur: '',
            idFonction: '',
            dateDebut: ''
        });
    };
    const onDelete = () => {
        console.log('delete');
    };

    const onEdit = () => {
        console.log('first');
    };

    useEffect(() => {
        const newArr = [];
        for (let i = 0; i < affectations.length; i += 1) {
            const affectation = affectations[i];
            let name = '';
            let surname = '';
            let designation = '';
            const dateDeb = affectation.dateDebut === null ? '' : affectation.dateDebut.split('T')[0];
            if (affectation.etat) {
                name = users.filter((us) => us.id_utilisateur === affectation.idUtilisateur)[0]?.nom.toUpperCase();
                surname = users.filter((us) => us.id_utilisateur === affectation.idUtilisateur)[0]?.prenom.toUpperCase();
                designation = functionsUser.filter((fu) => fu.id_fonction === affectation.idFonction)[0]?.designation.toUpperCase();
            }
            if (name !== '' && surname !== '') {
                newArr.push({
                    name,
                    surname,
                    dateDebut: dateDeb,
                    fonction: designation,
                    id_fonction: affectation.idFonction,
                    id_utilisateur: affectation.idUtilisateur,
                    id_affectation: affectation.idAffectation
                });
            }
        }
        setRows(newArr);
        console.log(newArr);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Stack alignItems="flex-end">
                    <Button variant="contained" onClick={() => handleClickOpen()} startIcon={<AddIcon />}>
                        Affectation
                    </Button>
                </Stack>
            </Grid>
            <CreatePosition open={open} setOpen={setOpen} handleCloseDialog={handleCloseDialog} affectationUser={affectationUser} />
            <Grid item xs={12}>
                <MainCard content={false}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        <FormattedMessage id="nom" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <FormattedMessage id="prenom" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {/* <FormattedMessage id="Fonction" /> */}
                                        Fonction
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <FormattedMessage id="startDat" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <FormattedMessage id="endDat" />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <FormattedMessage id="status" />
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ pr: 3 }}>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indx) => (
                                    <StyledTableRow hover key={indx}>
                                        <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.surname}</StyledTableCell>
                                        <StyledTableCell>{row.fonction}</StyledTableCell>
                                        <StyledTableCell>{row.dateDebut}</StyledTableCell>
                                        <StyledTableCell>{row.dateDebut}</StyledTableCell>
                                        <StyledTableCell>
                                            <Switch size="small" defaultChecked />
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ pr: 3 }}>
                                            <IconButton onClick={() => handleClickOpen(row)} size="small">
                                                <Edit sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    onDelete(row.id);
                                                }}
                                                size="small"
                                            >
                                                <Delete sx={{ fontSize: '1rem' }} />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </MainCard>
            </Grid>
        </Grid>
    );
};

PositionList.propTypes = {
    affectation: PropTypes.object,
    user: PropTypes.object,
    deleteAffectation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    affectation: state.affectation
});

export default connect(mapStateToProps, { deleteAffectation })(PositionList);
