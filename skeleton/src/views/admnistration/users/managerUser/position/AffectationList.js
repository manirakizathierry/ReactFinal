import {
    Button,
    Grid,
    IconButton,
    Stack,
    Switch,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip
} from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import { Delete, Edit } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import CreatePosition from './CreatePosition';
import { UserManager } from 'api/life/userManager/UserManager';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAffectation, getAllAffectation, updateAffectation } from 'store/userManagement/affectation/action';
import DeleteDialog from 'ui-component/DeleteDialog';
import { SNACKBAR_OPEN } from 'store/actions';
import UIProgress from 'views/ui-elements/advance/UIProgress';

const AffectationList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };
    const dispatch = useDispatch();
    const [modalCreatePosition, setModalCreatePosition] = useState(false);
    const affectation = useSelector((state) => state.affectationRed.affectation);
    const [affectationArray, setAffectationArray] = useState([]);
    const [openLoading, setOpenLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [selectedUpdate, setSelectedUpdate] = useState('');
    const [createPosition, setCreatePosition] = useState({
        id: '',
        id_utilisateur: '',
        id_departement: '',
        id_agence: '',
        id_service: '',
        id_fonction: '',
        dateDebut: ''
    });

    const handleClosePosition = () => {
        setModalCreatePosition(false);
    };

    const onOpenPositionModal = () => {
        if (modalCreatePosition) {
            return <CreatePosition open={modalCreatePosition} handleClose={handleClosePosition} createPositionToEdit={createPosition} />;
        }
        return console.log('mo modal Position ');
    };

    const onGetAllAffectation = () => {
        UserManager.getAllAffectationApi()
            .then((res) => {
                console.log(res.result);
                dispatch(getAllAffectation(res.result));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isSelectedUpdate = useMemo(() => {
        const arrayToUpdate = affectationArray.filter((affectation) => affectation.idAffectation === selectedUpdate);

        if (arrayToUpdate.length > 0) {
            return {
                updateModal: true,
                dataToUpdate: arrayToUpdate[0]
            };
        }
        return {
            updateModal: false,
            dataToUpdate: ''
        };
    }, [selectedUpdate]);

    const isSelected = useMemo(() => {
        const oneArraySelected = affectationArray.filter((affectation) => affectation.idAffectation === selected);
        console.log('oneArraySelected', oneArraySelected);
        if (oneArraySelected.length > 0) {
            return {
                modalDelete: true,
                idAffectation: oneArraySelected[0].idAffectation
            };
        }
        return {
            modalDelete: false,
            idAffectation: ''
        };
    }, [selected]);

    const handleClosePositionUpdate = () => {
        setSelectedUpdate('');
    };
    const onOpenModalToUpdate = () => {
        if (isSelectedUpdate.updateModal) {
            const objectToUpdateReturned = {
                id: isSelectedUpdate.dataToUpdate.idAffectation,
                id_utilisateur: isSelectedUpdate.dataToUpdate.utilisateur.id_utilisateur,
                id_departement: isSelectedUpdate.dataToUpdate.departementDTO.id_departement,
                id_agence: isSelectedUpdate.dataToUpdate.agenceDTO.id_agence,
                id_service: isSelectedUpdate.dataToUpdate.serviceDTO.id_service,
                id_fonction: isSelectedUpdate.dataToUpdate.fonctionDTO.id_fonction,
                dateDebut: isSelectedUpdate.dataToUpdate.dateDebut
            };
            console.log(objectToUpdateReturned);

            return (
                <CreatePosition
                    open={isSelectedUpdate.updateModal}
                    handleClose={handleClosePositionUpdate}
                    createPositionToEdit={objectToUpdateReturned}
                />
            );
        }
        return console.log('no modal to update affectation');
    };

    const handleCloseModalDeleteValidation = () => {
        setSelected('');
    };

    let loading = false;
    const switchss = (affectation) => {
        console.log('affectation.idAffectation', affectation.idAffectation);
        loading = true;
        setOpenLoading(true);
        UserManager.statusAffectationApi(affectation.idAffectation, {
            etat: !affectation.etat
        })
            .then((res) => {
                if (res.success) {
                    console.log('res===>>', res.result);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(updateAffectation(res.result));
                    setOpenLoading(false);
                } else {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'warning',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                }
            })
            .catch((error) => {
                console.log('error===>>', error.message);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${error.response?.data.message ? error.response.data.message : error.message}`,
                    variant: 'alert',
                    alertSeverity: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
                setOpenLoading(false);
            });
    };

    const handleDelete = () => {
        console.log(isSelected.idAffectation);
        UserManager.deleteAffectation(isSelected.idAffectation)
            .then((res) => {
                dispatch(deleteAffectation(isSelected.idAffectation));

                console.log('dataaaaa result ===>>>', res);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: res.message,
                    variant: 'alert',
                    alertSeverity: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
                handleCloseModalDeleteValidation();
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${error.response?.data.message ? error.response.data.message : error.message}`,
                    variant: 'alert',
                    alertSeverity: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
            });
        // handleCloseModalDeleteValidation();
    };

    const onDeleteValidation = () => {
        console.log('ok');
        return isSelected.modalDelete ? (
            <DeleteDialog
                btnName={<FormattedMessage id="delete" />}
                handleSubmit={handleDelete}
                title={<FormattedMessage id="do-you-want-delete" />}
                open={isSelected.modalDelete}
                handleClose={handleCloseModalDeleteValidation}
            />
        ) : (
            ''
        );
    };

    useEffect(() => {
        setAffectationArray(affectation);
    });

    useEffect(() => {
        onGetAllAffectation();
    }, []);
    return (
        <Grid container spacing={gridSpacing}>
            {onOpenPositionModal()}
            {onDeleteValidation()}
            {onOpenModalToUpdate()}
            <Grid item xs={12}>
                <Stack alignItems="flex-end">
                    <Button variant="contained" onClick={() => setModalCreatePosition(true)} startIcon={<AddIcon />}>
                        <FormattedMessage id="affect-user" />
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                {openLoading && <UIProgress />}
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
                            {affectationArray.length === 0 ? (
                                <StyledTableCell colSpan={8}>
                                    <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                                </StyledTableCell>
                            ) : (
                                affectationArray?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((affectation, indx) => (
                                    <StyledTableRow hover key={indx}>
                                        <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                            {affectation.utilisateur?.nom}
                                        </StyledTableCell>
                                        <StyledTableCell>{affectation.utilisateur?.prenom}</StyledTableCell>
                                        <StyledTableCell>{affectation.fonctionDTO.designation}</StyledTableCell>
                                        <StyledTableCell>{affectation.fonctionDTO.date_creation}</StyledTableCell>
                                        <StyledTableCell>{affectation.dateDebut}</StyledTableCell>
                                        <StyledTableCell>
                                            <Switch
                                                size="small"
                                                disabled={loading}
                                                onChange={() => switchss(affectation)}
                                                checked={affectation.etat === null ? false : affectation.etat}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ pr: 3 }}>
                                            <Tooltip title="update user">
                                                <IconButton onClick={() => setSelectedUpdate(affectation.idAffectation)} size="small">
                                                    <Edit sx={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="delete user">
                                                <IconButton
                                                    onClick={() => {
                                                        setSelected(affectation.idAffectation);
                                                    }}
                                                    size="small"
                                                >
                                                    <Delete sx={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
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
                    count={affectationArray.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default AffectationList;
