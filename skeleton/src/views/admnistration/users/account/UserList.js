import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// material-ui
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Grid,
    Button,
    Stack,
    IconButton,
    TableCell,
    Switch,
    TablePagination
} from '@mui/material';

// import * as userAPI from 'api/userAPI';
import { getUsers, deleteUser, getAffectation, insertUserArch } from 'api/userAPI';

// assets
import AddIcon from '@mui/icons-material/AddTwoTone';
import { gridSpacing } from 'store/constant';
import { connect, useDispatch } from 'react-redux';
import CreateUser from './CreateUser';
import { Delete, Edit } from '@mui/icons-material';
import { StyledTableCell, StyledTableRow } from 'utils/tools';
import { FormattedMessage } from 'react-intl';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { UserManager } from 'api/life/userManager/UserManager';
import { DELETE_USER, SNACKBAR_OPEN, UPDATE_USER } from 'store/actions';
import UserModalDelete from './UserModalDelete';
import DeleteDialog from 'ui-component/DeleteDialog';

// ==============================|| TABLE - CUSTOMIZED ||============================== //
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const UserList = ({ user: { users }, getUsers, getAffectation, deleteUser }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openLoading, setOpenLoading] = useState(false);
    const [selecteId, setSelecteId] = useState('');
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [userToEdit, setUserToEdit] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        cni: '',
        path: '',
        username: '',
        password: ''
    });

    /// for getting id selected in order to use open modal

    const isSelected = useMemo(() => {
        const arraySelected = users.filter((data) => data.id_utilisateur === selecteId);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    console.log('users', users);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getUsers();
        getAffectation();
    }, []);
    useEffect(() => {}, [users]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = (user) => {
        setUserToEdit({
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            cni: '',
            path: '',
            username: '',
            password: ''
        });
        if (user) {
            setUserToEdit(user);
        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setUserToEdit({
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            cni: '',
            path: '',
            username: '',
            password: ''
        });
    };

    let loading = false;
    const switchss = (row) => {
        console.log('row.id_utilisateur', row.id_utilisateur);
        loading = true;
        setOpenLoading(true);
        UserManager.Status(row.id_utilisateur, {
            statut: !row.etat
        })
            .then((res) => {
                console.log('res===>>', res);
                dispatch({
                    type: UPDATE_USER,
                    userModify: res.result
                });

                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: res.message,
                    variant: 'alert',
                    alertSeverity: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
                setOpenLoading(false);
            })
            .catch((error) => {
                console.log('error===>>', error.message);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${error.response?.data.message ? error.response.data.message : error.message}`,
                    variant: 'alert',
                    alertSeverity: 'warning',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
                setOpenLoading(false);
            });
    };
    const handleCloseModalDeleteValidation = () => {
        setSelecteId('');
    };

    const handleDelete = () => {
        console.log(isSelected.id_utilisateur);
        UserManager.Delete(isSelected.id_utilisateur)
            .then((res) => {
                dispatch({
                    type: DELETE_USER,
                    payload: isSelected.id_utilisateur
                });

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

    return (
        <Grid container spacing={gridSpacing}>
            {onDeleteValidation()}
            {openLoading && <UIProgress />}
            <Grid item xs={12}>
                <Stack alignItems="flex-end">
                    <Button variant="contained" onClick={() => handleClickOpen()} startIcon={<AddIcon />}>
                        Ajouter utilisateur
                    </Button>
                </Stack>
            </Grid>
            <CreateUser open={open} setOpen={setOpen} handleCloseDialog={handleCloseDialog} userToEdit={userToEdit} />

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
                                <StyledTableCell sx={{ pr: 3 }}>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, indx) => (
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
                                    <StyledTableCell>
                                        <Tooltip sx={{ fontSize: '1rem' }} title="Update user">
                                            <IconButton
                                                onClick={() => {
                                                    handleClickOpen(row);
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
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Aucune donnée à afficher
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
};

UserList.propTypes = {
    user: PropTypes.object,
    getUsers: PropTypes.func.isRequired,
    getAffectation: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { getUsers, getAffectation, deleteUser })(UserList);
