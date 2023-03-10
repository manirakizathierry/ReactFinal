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
import React, { useEffect, useState, memo, useMemo } from 'react';
import AddIcon from '@mui/icons-material/AddTwoTone';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import { Delete, Edit } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
// import { UserManager } from 'api/life/userManager/UserManager';
import { saveAllUser, updateStatutUser, deleteUser } from 'store/userManagement/actionUser/action';
import { useSelector, useDispatch } from 'react-redux';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { SNACKBAR_OPEN } from 'store/actions';
import DeleteDialog from 'ui-component/DeleteDialog';
import CreateUser from './CreateUser';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const UserList = () => {
    const userLocal = JSON.parse(window.localStorage.getItem('users'));
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.users.usersArray);
    console.log(dataredux);
    const [createUser, setCreateUser] = useState({
        id: '',
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        cni: '',
        path: '',
        username: ''
        // password: ''
    });
    const [userss, setuserss] = useState([]);
    const [page, setPage] = useState(0);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selecteId, setSelecteId] = useState('');
    const [selectedUpdate, setSelecteUpdate] = useState('');
    const [openLoading, setOpenLoading] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelectedUpdate = useMemo(() => {
        const arraySelectedUpdate = userss.filter((data) => data.id_utilisateur === selectedUpdate);

        if (arraySelectedUpdate.length > 0) {
            console.log('arraySelectedUpdate[0]', arraySelectedUpdate[0]);
            return {
                modalUpdate: true,
                objectUpdate: arraySelectedUpdate[0]
            };
        }
        return {
            modalUpdate: false,
            objectUpdate: null
        };
    }, [selectedUpdate]);

    const isSelected = useMemo(() => {
        const arraySelected = userss.filter((data) => data.id_utilisateur === selecteId);
        console.log('arraySelected====>>>', arraySelected);

        if (arraySelected.length > 0) {
            console.log(arraySelected[0]?.id_utilisateur);

            return {
                modalDelete: true,
                id_utilisateur: arraySelected[0]?.id_utilisateur
            };
        }
        return {
            modalDelete: false,
            id_utilisateur: ''
        };
    }, [selecteId]);

    const handleCloseModalDeleteValidation = () => {
        setSelecteId('');
    };

    const getAllUserData = () => {
        setOpenLoading(true);
        // UserManager.getAllUser()
        //     .then((res) => {
        //         console.log('res result dataa from server======>', res.result);
        //         dispatch(saveAllUser(res.result));
        //         setOpenLoading(false);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         dispatch({
        //             type: SNACKBAR_OPEN,
        //             open: true,
        //             message: `${error.response?.data.message ? error.response.data.message : error.message}`,
        //             variant: 'alert',
        //             alertSeverity: 'warning',
        //             anchorOrigin: { vertical: 'top', horizontal: 'right' },
        //             close: true
        //         });
        //         setOpenLoading(false);
        //     });
    };

    let loading = false;
    const switchss = (row) => {
        console.log('row.id_utilisateur', row.id_utilisateur);
        loading = true;
        setOpenLoading(true);
        // UserManager.Status(row.id_utilisateur, {
        //     statut: !row.etat,
        //     traited_by: userLocal.utilisateur
        // })
        // .then((res) => {
        //     if (res.success) {
        //         console.log('res===>>', res);
        //         console.log('res.result====>>', res.result);
        //         dispatch(updateStatutUser(res.result));
        //         dispatch({
        //             type: SNACKBAR_OPEN,
        //             open: true,
        //             message: res.message,
        //             variant: 'alert',
        //             alertSeverity: 'success',
        //             anchorOrigin: { vertical: 'top', horizontal: 'right' },
        //             close: true
        //         });
        //         setOpenLoading(false);
        //     } else {
        //         dispatch({
        //             type: SNACKBAR_OPEN,
        //             open: true,
        //             message: res.message,
        //             variant: 'alert',
        //             alertSeverity: 'warning',
        //             anchorOrigin: { vertical: 'top', horizontal: 'right' },
        //             close: true
        //         });
        //         setOpenLoading(false);
        //     }
        // })
        // .catch((error) => {
        //     console.log('error===>>', error.message);
        //     dispatch({
        //         type: SNACKBAR_OPEN,
        //         open: true,
        //         message: `${error.response?.data.message ? error.response.data.message : error.message}`,
        //         variant: 'alert',
        //         alertSeverity: 'warning',
        //         anchorOrigin: { vertical: 'top', horizontal: 'right' },
        //         close: true
        //     });
        //     setOpenLoading(false);
        // });
    };

    /// /deletind row user

    const handleDelete = () => {
        console.log(isSelected.id_utilisateur);
        // const deletedBy = { deletedBy: userLocal.id_utilisateur };
        // UserManager.Delete(isSelected.id_utilisateur)
        //     .then((res) => {
        //         dispatch(deleteUser(isSelected.id_utilisateur));
        //         console.log('dataaaaa result ===>>>', res);
        //         dispatch({
        //             type: SNACKBAR_OPEN,
        //             open: true,
        //             message: res.message,
        //             variant: 'alert',
        //             alertSeverity: 'success',
        //             anchorOrigin: { vertical: 'top', horizontal: 'right' },
        //             close: true
        //         });
        //         handleCloseModalDeleteValidation();
        //     })
        // .catch((error) => {
        //     console.log(error);
        //     dispatch({
        //         type: SNACKBAR_OPEN,
        //         open: true,
        //         message: `${error.response?.data.message ? error.response.data.message : error.message}`,
        //         variant: 'alert',
        //         alertSeverity: 'error',
        //         anchorOrigin: { vertical: 'top', horizontal: 'right' },
        //         close: true
        //     });
        // });
        handleCloseModalDeleteValidation();
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

    /// create a user
    const onHandleCLoseUserModal = () => {
        setOpenModalUser(false);
    };
    const onHnadleCloseUpdate = () => {
        setSelecteUpdate('');
    };

    const onUpdateUser = () => {
        if (isSelectedUpdate.modalUpdate) {
            const createUseUpdate = {
                id: isSelectedUpdate.objectUpdate.id_utilisateur,
                nom: isSelectedUpdate.objectUpdate.nom,
                prenom: isSelectedUpdate.objectUpdate.prenom,
                telephone: isSelectedUpdate.objectUpdate.telephone,
                email: isSelectedUpdate.objectUpdate.email,
                cni: isSelectedUpdate.objectUpdate.cni,
                path: '',
                username: isSelectedUpdate.objectUpdate.username
                // password: isSelectedUpdate.objectUpdate.password
            };
            return <CreateUser open={isSelectedUpdate.modalUpdate} handleClose={onHnadleCloseUpdate} createUserToEdit={createUseUpdate} />;
        }
        return console.log('update no modal');
    };

    // const onCreateUser = () => {
    //     return openModalUser ? (
    //         <CreateUser open={openModalUser} handleClose={() => onHandleCLoseUserModal()} createUserToEdit={createUser} />
    //     ) : (
    //         ''
    //     );
    // };

    useEffect(() => {
        console.log('useEffect1 ');
        setuserss(dataredux);
    }, [dataredux]);

    useEffect(() => {
        console.log('useEffect2 ');
        getAllUserData();
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            {onDeleteValidation()}
            {/* {onCreateUser()} */}
            {onUpdateUser()}

            <Grid item xs={12}>
                <Stack alignItems="flex-end">
                    <Button variant="contained" onClick={() => setOpenModalUser(true)} startIcon={<AddIcon />}>
                        <FormattedMessage id="add-user" />
                    </Button>
                </Stack>
            </Grid>
            <Grid item xs={12}>
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
                                    <FormattedMessage id="username" />
                                </StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>
                                    <FormattedMessage id="phoneNumber" />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <FormattedMessage id="status" />
                                </StyledTableCell>
                                {/* <StyledTableCell sx={{ pr: 3 }}>Action</StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {openLoading && <TotalIncomeCard />} */}
                            {userss.length === 0 || userss.length === undefined ? (
                                <StyledTableCell colSpan={8}>
                                    <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                                </StyledTableCell>
                            ) : (
                                userss.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indx) => (
                                    <StyledTableRow hover key={indx}>
                                        <StyledTableCell>{row.nom}</StyledTableCell>
                                        <StyledTableCell>{row.prenom}</StyledTableCell>
                                        <StyledTableCell>{row.username}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.telephone}</StyledTableCell>
                                        <StyledTableCell>
                                            <Switch
                                                size="small"
                                                {...label}
                                                disabled={loading}
                                                onChange={() => switchss(row)}
                                                checked={row.etat === null ? false : row.etat}
                                            />
                                        </StyledTableCell>
                                        {/* <StyledTableCell>
                                            <Tooltip sx={{ fontSize: '1rem' }} title="Update user">
                                                <IconButton
                                                    onClick={() => {
                                                        setSelecteUpdate(row.id_utilisateur);
                                                    }}
                                                    size="small"
                                                >
                                                    <Edit sx={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip sx={{ fontSize: '1rem' }} title="Delete user">
                                                <IconButton
                                                    onClick={() => {
                                                        setSelecteId(row.id_utilisateur);
                                                    }}
                                                    size="small"
                                                >
                                                    <Delete sx={{ fontSize: '1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </StyledTableCell> */}
                                    </StyledTableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userss.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

export default memo(UserList);
