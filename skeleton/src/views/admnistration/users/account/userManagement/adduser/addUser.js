import { FormattedMessage, useIntl } from 'react-intl';
import TypographyListDescription from 'ui-component/TypographyListDescription';
import TypographyListHeader from 'ui-component/TypographyListHeader';
import { Grid, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
// import ListSearchComponent from 'ui-component/ListSearchComponent';
import ButtonComponent from 'ui-component/ButtonComponent';
import { gridSpacing } from 'store/constant';
import { Add, Print, Refresh } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import CustomDeleteDialog from 'ui-component/CustomDeleteDialog';
import AddNewUserDialog from './AddNewUserDialog';
import TablesCustomizedComponent from 'ui-component/TablesCustomizedComponent';
import { useReactToPrint } from 'react-to-print';
import TableToPrint from 'views/pdf/TableToPrint';
import PdfCustom from 'views/pdf/PdfCustom';
import axios from 'axios';
// import { userAPI } from 'api';
import ListSearchComponent from 'ui-component/ListSearchComponent';
import { userAPI } from 'api';

export default function AddUser() {
    const [loading, setLoading] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const [chaptersList, setChaptersList] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [tableToExport, setTableToExport] = useState('');
    const [loadingError, setLoadingError] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [page, setPage] = useState({ sort: 'asc', title: '', page: 0, size: 10, length: 1, totalItems: 0 });
    const [userToEdit, setUserToEdit] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        telephone: '',
        thumbnail: null
    });
    // hooks
    const intl = useIntl();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const componentRef = useRef(null);

    // snack Alert box for displaying massages
    const snackAlert = (message, state) => {
        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message,
            variant: 'alert',
            alertSeverity: state
        });
    };

    // loading init function
    const getAllData = (pages) => {
        setLoading(true);
        setUsersList([]);
        setLoadingError(false);
        userAPI
            .getUsers()
            .then((userRes) => {
                console.log('This is a user from KeyCloakkkkk===>', userRes);
                if (isMounted.current) {
                    console.log('This is a user from KeyCloakkkkk===>', userRes);
                }
                setUsersList(userRes);
            })
            .catch((error) => {
                if (isMounted.current) {
                    snackAlert(`${error.response?.data.message ? error.response.data.message : error}`, 'error');
                    setLoading(false);
                    setLoadingError(true);
                }
            });
    };

    useEffect(() => {
        isMounted.current = true;
        getAllData();
        return () => {
            isMounted.current = false;
        };
    }, []);

    // open creating or delete dialog
    const handleClickOpenCreateOrEditDialog = (user) => {
        console.log('kkkkk===>', user);
        if (user) {
            const dataBack = usersList.find((item) => item.id === user.id);
            console.log('dataBack', dataBack);
            if (dataBack) {
                setUserToEdit({
                    ...dataBack,
                    nom: dataBack.lastName,
                    prenom: dataBack.firstName,
                    username: dataBack.username,
                    email: dataBack.email
                });
                // console.log('hellooo', dataBack);
            }
        } else {
            setUserToEdit({
                nom: '',
                prenom: '',
                email: '',
                username: '',
                telephone: '',
                thumbnail: null
            });
        }
        setOpenDialog(true);
    };
    // close create or edit dialog
    const handleClickCloseCreateOrEditDialog = (newUser) => {
        if (userToEdit.id || !newUser) {
            setOpenDialog(false);
        }
        console.log(newUser);
        if (newUser) {
            getAllData();
        }
    };
    // open delete dialog
    const handleClickOpenDeleteDialog = (user) => {
        console.log('this is deleting item ', user);
        setUserToDelete(user);
        setOpenDeleteDialog(true);
    };

    // close delete dialog
    const handleClickCloseDeleteAlertDialog = (user) => {
        if (user) {
            getAllData();
        }
        setOpenDeleteDialog(false);
    };

    // handle change row par page
    const handleChangeRowsPerPage = (e) => {
        const value = e.target.value;
        getAllData({
            ...page,
            size: value,
            page: 0
        });
    };

    // table paginate
    const paginate = (e, values) => {
        getAllData({
            ...page,
            page: values - 1
        });
    };
    const filterList = () =>
        usersList
            ? usersList.map((item) => ({
                  id: item.id,
                  nom: item.lastName,
                  prenom: item.firstName,
                  username: item.username,
                  email: item.email
              }))
            : [];
    console.log('fiterlist of users', filterList());

    // handle search component
    const getSearchData = () => {
        getAllData({
            ...page,
            page: 0,
            size: 10,
            title: searchVal
        });
    };

    // handle search component
    const handleSearchValue = (searchVal) => {
        if (searchVal === '') getSearchData();
        setSearchVal(searchVal.target.value);
    };

    // table header
    const headers = [
        `${intl.formatMessage({ id: 'nom' })}`,
        `${intl.formatMessage({ id: 'prenom' })}`,
        `${intl.formatMessage({ id: 'username' })}`,
        `${intl.formatMessage({ id: 'email' })}`
    ];
    // printing and eporting
    const handlePrint = useReactToPrint({
        content: () => {
            const tableStat = componentRef.current;
            const PrintElem = document.createElement('div');
            PrintElem.appendChild(tableStat);
            return PrintElem;
        }
    });
    // handle sort
    const handleSort = () => {
        getAllData({
            ...page,
            sort: page?.sort === 'asc' ? 'desc' : 'asc'
        });
    };
    // titre
    const titre = 'LISTE DES UTILISATEURS ';

    return (
        <>
            <div style={{ display: 'none' }}>
                <TableToPrint ref={componentRef} title={titre} body={<PdfCustom headers={headers} rows={filterList()} />} />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={12}>
                    <TypographyListHeader text={<FormattedMessage id="user" />} />
                    <TypographyListDescription text=" Create, view, edit, and print users." />
                </Grid>{' '}
                <Grid item xs={12} lg={12} mb={-1}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <ListSearchComponent
                                    loading={loading}
                                    filter={getSearchData}
                                    filterValue={searchVal}
                                    loadingError={loadingError}
                                    setFilterValue={setSearchVal}
                                    handleChange={handleSearchValue}
                                />
                                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                    {loading ||
                                        (!loadingError && (
                                            <ButtonComponent
                                                refresh
                                                size="small"
                                                variant="contained"
                                                startIcon={<Refresh />}
                                                text={<FormattedMessage id="refresh" />}
                                                handleClick={() => {
                                                    getAllData({ ...page, page: 0 });
                                                }}
                                            />
                                        ))}
                                    <ButtonComponent
                                        size="small"
                                        variant="contained"
                                        startIcon={<Print />}
                                        handleClick={() => handlePrint()}
                                        // disabled={loading || loadingError}
                                        text={<FormattedMessage id="print" />}
                                    />
                                    <ButtonComponent
                                        size="small"
                                        startIcon={<Add />}
                                        variant="contained"
                                        // disabled={loading || loadingError}
                                        text={<FormattedMessage id="new-user" />}
                                        handleClick={() => handleClickOpenCreateOrEditDialog()}
                                    />
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {/* {!loadingError ? ( */}
                            <TablesCustomizedComponent
                                actions
                                sort={[0]}
                                page={page}
                                stickyHeader
                                headers={headers}
                                // loading={loading}
                                paginate={paginate}
                                rows={filterList()}
                                handleSort={handleSort}
                                setTableToExport={setTableToExport}
                                deleteFunction={handleClickOpenDeleteDialog}
                                editFunction={handleClickOpenCreateOrEditDialog}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                            {/* ) : ( */}
                            {/* <MainCard>
                                    <Stack justifyContent="center" alignItems="center">
                                        <ButtonComponent
                                            startIcon={<Refresh />}
                                            text={<FormattedMessage id="refresh" />}
                                            handleClick={() => getAllData({ ...page, page: 0 })}
                                            size="small"
                                            variant="contained"
                                        />
                                    </Stack>
                                </MainCard> */}
                            {/* )} */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <AddNewUserDialog
                open={openDialog}
                snackAlert={snackAlert}
                userToEdit={userToEdit}
                handleClose={handleClickCloseCreateOrEditDialog}
            />
            {/* <CustomDeleteDialog
                snackAlert={snackAlert}
                open={openDeleteDialog}
                toDelete={articleToDelete}
                api={articleAPI.deleteArticle}
                text={<FormattedMessage id="Articles" />}
                handleClose={handleClickCloseDeleteAlertDialog}
            /> */}
        </>
    );
}
