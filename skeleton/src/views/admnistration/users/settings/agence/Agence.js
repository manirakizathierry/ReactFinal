import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { element } from 'prop-types';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// material-ui
import {
    Button,
    Divider,
    Grid,
    TextField,
    FormControlLabel,
    CardActions,
    MenuItem,
    RadioGroup,
    Radio,
    Typography,
    FormHelperText,
    OutlinedInput,
    InputAdornment,
    FormControl,
    IconButton,
    Autocomplete,
    Checkbox,
    CardHeader,
    InputLabel,
    FormGroup,
    Stack,
    FormLabel,
    Card,
    TextareaAutosize,
    useTheme,
    Table,
    TableContainer,
    TableRow,
    TableHead,
    TableBody,
    TablePagination
} from '@mui/material';

import TypographyListHeader from 'ui-component/TypographyListHeader';
import TypographyListDescription from 'ui-component/TypographyListDescription';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import { EnhancedTableToolbar, StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import SaveIcon from '@mui/icons-material/Save';
import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormattedMessage } from 'react-intl';
import { UserManager } from 'api/life/userManager/UserManager';
import { addAgence, deleteAgence, getAllAgence, updateAgence } from 'store/userManagement/actionAgeDepSerFxTach/action';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
import * as yup from 'yup';
import { useFormik, useFormikContext, useField } from 'formik';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { Edit } from '@mui/icons-material';

const validationSchema = yup.object({
    designation: yup.string().required('designation est requis  '),
    id_societe: yup.string().required('societe est requis'),
    adresse: yup.string().required('adresse est requis')
});

const initialValue = {
    id_agence: '',
    designation: '',
    id_societe: '',
    adresse: ''
};

const Agence = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [agenceData, setAgenceData] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([
        {
            id: '8',
            name: 'Jubilee Insurance Company Of Burundi'
        }
    ]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const agences = useSelector((state) => state.agDepServTach.agence);
    const [agencesArray, setAgencesArray] = useState([]);

    const onGetAllAgence = () => {
        UserManager.getAllAgenceApi()
            .then((res) => {
                console.log(res.result);
                dispatch(getAllAgence(res.result));
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
    };

    console.log('array', agences);
    const onSubmitData = (data) => {
        if (data.id_agence === '') {
            console.log('add');
            const addtoSever = {
                designation: data.designation,
                adresse: data.adresse,
                id_societe: data.id_societe
            };
            console.log(addtoSever);
            setLoading(true);
            UserManager.addAgenceApi(addtoSever)
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(addAgence(res.result));
                    resetData();
                    setLoading(false);
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
                    setLoading(false);
                });
        } else {
            console.log('update');
            const updateServer = {
                designation: data.designation,
                adresse: data.adresse,
                id_societe: data.id_societe
            };
            UserManager.udpdateAgenceApi(data.id_agence, updateServer)
                .then((res) => {
                    console.log(res);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(updateAgence(res.result));
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
        }
    };
    const formik = useFormik({
        initialValues: agenceData,
        validationSchema,
        onSubmit: (data) => onSubmitData(data)
    });
    const handleDeleteAgence = () => {
        UserManager.deleteAgenceApi(formik.values.id_agence)
            .then((res) => {
                console.log(res);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: res.message,
                    variant: 'alert',
                    alertSeverity: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });

                dispatch(deleteAgence(formik.values.id_agence));
                resetData();
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
    };

    const resetData = () => {
        setAgenceData({
            id_agence: '',
            designation: '',
            id_societe: '',
            adresse: ''
        });
        formik.resetForm();
    };

    const handleClickRow = (data) => {
        console.log('data===>', data);
        formik.setValues({
            id_agence: data.id_agence,
            designation: data.designation,
            id_societe: data.id_societe,
            adresse: data.adresse
        });
    };

    useEffect(() => {
        setAgencesArray(agences);
    });

    useEffect(() => {
        onGetAllAgence();
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
                <TypographyListHeader text="Agence" />
            </Grid>
            <Grid item xs={12} lg={12} mb={-1}>
                <TypographyListDescription text="Agence" />
            </Grid>
            {loading && <UIProgress />}
            <Grid item xs={12} lg={12}>
                <form onSubmit={formik.handleSubmit} id="form-validation-withdraw">
                    <MainCard sx={{ mb: 1 }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>
                                    <Typography variant="subtitle1">Désignation</Typography>
                                </InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="designation"
                                    name="designation"
                                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                                    helperText={formik.touched.designation && formik.errors.designation}
                                    value={formik.values.designation}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>
                                    <Typography variant="subtitle1">Adresse</Typography>
                                </InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="adresse"
                                    name="adresse"
                                    error={formik.touched.adresse && Boolean(formik.errors.adresse)}
                                    helperText={formik.touched.adresse && formik.errors.adresse}
                                    value={formik.values.adresse}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>
                                    <Typography variant="subtitle1">Société</Typography>
                                </InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
                                    select
                                    id="id_societe"
                                    name="id_societe"
                                    value={formik.values.id_societe}
                                    error={formik.touched.id_societe && Boolean(formik.errors.id_societe)}
                                    helperText={formik.touched.id_societe && formik.errors.id_societe}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Aucun</em>
                                    </MenuItem>
                                    {companies.map((option, index) => (
                                        <MenuItem key={index} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} lg={4}>
                                <Button
                                    startIcon={formik.values.id_agence === '' ? <SaveIcon /> : <EditIcon />}
                                    type="submit"
                                    size="small"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    {formik.values.id_agence === '' ? <FormattedMessage id="save" /> : <FormattedMessage id="edit" />}
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Button startIcon={<CachedIcon />} size="small" fullWidth variant="outlined" onClick={() => resetData()}>
                                    <FormattedMessage id="reset" />
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Button
                                    disabled={formik.values.id_agence === ''}
                                    startIcon={<DeleteIcon />}
                                    size="small"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        background: theme.palette.warning.dark,
                                        '&:hover': { background: theme.palette.warning.main },
                                        color: 'grey.900'
                                    }}
                                    onClick={() => handleDeleteAgence()}
                                >
                                    <FormattedMessage id="delete" />
                                </Button>
                            </Grid>
                        </Grid>
                    </MainCard>

                    <MainCard
                        sx={{ mb: 1 }}
                        title={
                            <TextField
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }}
                                // onChange={handleSearch}
                                placeholder="Rechercher"
                                // value={search}
                                size="small"
                            />
                        }
                    >
                        <EnhancedTableToolbar />
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">No</StyledTableCell>
                                        <StyledTableCell align="left">
                                            {/* <FormattedMessage id="amount-withdraw" /> */}
                                            Désignation
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {/* <FormattedMessage id="date-operation" /> */}
                                            Adresse
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {/* <FormattedMessage id="amount-withdraw" /> */}
                                            Société
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            {/* <FormattedMessage id="amount-withdraw" /> */}
                                            Action
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {agencesArray?.length === 0 ? (
                                        <StyledTableCell colSpan={8}>
                                            <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                                        </StyledTableCell>
                                    ) : (
                                        agencesArray?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                                            <StyledTableRow
                                                sx={{ ':hover td': { cursor: 'pointer', backgroundColor: '#DDEDF9', color: 'black' } }}
                                                key={index}
                                            >
                                                <StyledTableCell align="left">{index + 1}</StyledTableCell>

                                                <StyledTableCell align="left">{data?.designation}</StyledTableCell>
                                                <StyledTableCell align="left">{data?.adresse}</StyledTableCell>
                                                <StyledTableCell align="left">{data?.societe}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <>
                                                        <IconButton size="small" onClick={() => handleClickRow(data)}>
                                                            <Edit />
                                                        </IconButton>
                                                    </>
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
                            count={agencesArray?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </MainCard>
                </form>
            </Grid>
        </Grid>
    );
};

export default Agence;
