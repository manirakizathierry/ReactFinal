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
import SaveIcon from '@mui/icons-material/Save';
import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TypographyListHeader from 'ui-component/TypographyListHeader';
import TypographyListDescription from 'ui-component/TypographyListDescription';
import { gridSpacing } from 'store/constant';
import { FormattedMessage } from 'react-intl';
import MainCard from 'ui-component/cards/MainCard';
import { useFormik } from 'formik';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import { Edit } from '@mui/icons-material';
import * as yup from 'yup';
import { UserManager } from 'api/life/userManager/UserManager';
import { useDispatch, useSelector } from 'react-redux';
import {
    addFonction,
    deletaFonction,
    getAllFonction,
    getAllTache,
    updateFonction
} from 'store/userManagement/actionAgeDepSerFxTach/action';
import { SNACKBAR_OPEN } from 'store/actions';

const validationSchema = yup.object({
    designation: yup.string().required('designation est requis  ')
});

const initialValue = {
    id_fonction: '',
    designation: '',
    description: ''
};

const FunctionNew = () => {
    const dispatch = useDispatch();
    const fonctions = useSelector((state) => state.agDepServTach.fonction);
    const theme = useTheme();
    const [fonctionData, setFunctionData] = useState(initialValue);
    const [fonctionArray, setFunctionArray] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const onGetTache = () => {
        UserManager.getAllTacheApi()
            .then((res) => {
                console.log('res taches', res);
                dispatch(getAllTache(res.result));
            })
            .catch((error) => {
                console.log('error for tache====>>', error);
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

    const onGetFonctionAll = () => {
        UserManager.getAllFonctionApi()
            .then((res) => {
                dispatch(getAllFonction(res.result));
            })
            .catch((error) => {
                console.log('error====>>>', error);
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

    const onHandleSubmit = (data) => {
        if (data.id_fonction === '') {
            // console.log('data====>>>>', data);
            const addToServer = {
                designation: data.designation,
                description: data.description
            };
            UserManager.addFunctionApi(addToServer)
                .then((res) => {
                    console.log('res====>>>', res);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(addFonction(res.result));
                })
                .catch((error) => {
                    console.log('error====>>>', error);
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
        } else {
            console.log('update====>>>>', data);
            const updateServer = {
                designation: data.designation,
                description: data.description
            };
            UserManager.updateFunctionApi(data.id_fonction, updateServer)
                .then((res) => {
                    console.log('res===>>', res);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(updateFonction(res.result));
                })
                .catch((error) => {
                    console.log('error==>>>>>', error);
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
        initialValues: fonctionData,
        validationSchema,
        onSubmit: (data) => onHandleSubmit(data)
    });
    const ResetData = () => {
        formik.resetForm();
        setFunctionData({
            id_fonction: '',
            designation: '',
            description: ''
        });
    };
    const onHandleDelete = () => {
        UserManager.deleteFunctionApi(formik.values.id_fonction)
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
                dispatch(deletaFonction(formik.values.id_fonction));
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

    const handleClickRow = (rowData) => {
        formik.setValues({
            id_fonction: rowData.id_fonction,
            designation: rowData.designation,
            description: rowData.description
        });
    };
    useEffect(() => {
        setFunctionArray(fonctions);
    });
    useEffect(() => {
        onGetFonctionAll();
        onGetTache();
    }, []);
    return (
        <>
            <Grid container spacing={1}>
                {/* <Grid item xs={12} lg={12}>
                    <TypographyListHeader text="Fonction" />
                </Grid> */}
                <Grid item xs={12} lg={12}>
                    <TypographyListDescription text="Fonction" />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <form onSubmit={formik.handleSubmit} id="form-validation-fonction">
                        <MainCard>
                            <Grid container spacing={gridSpacing} justifyContent="center">
                                <Grid item xs={12} lg={6}>
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
                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1">Description</Typography>
                                    </InputLabel>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        id="description"
                                        name="description"
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Button
                                        startIcon={formik.values.id_fonction === '' ? <SaveIcon /> : <EditIcon />}
                                        type="submit"
                                        size="small"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        {formik.values.id_fonction === '' ? <FormattedMessage id="save" /> : <FormattedMessage id="edit" />}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Button
                                        startIcon={<CachedIcon />}
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => ResetData()}
                                    >
                                        <FormattedMessage id="reset" />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} lg={4}>
                                    <Button
                                        disabled={formik.values.id_fonction === ''}
                                        startIcon={<DeleteIcon />}
                                        size="small"
                                        fullWidth
                                        variant="contained"
                                        onClick={() => onHandleDelete()}
                                        sx={{
                                            background: theme.palette.warning.dark,
                                            '&:hover': { background: theme.palette.warning.main },
                                            color: 'grey.900'
                                        }}
                                    >
                                        <FormattedMessage id="delete" />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={gridSpacing} mt={2}>
                                <Grid item xs={12} lg={12}>
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
                                                        {/* <FormattedMessage id="amount-withdraw" /> */}
                                                        Description
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {/* <FormattedMessage id="amount-withdraw" /> */}
                                                        Date creation
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {/* <FormattedMessage id="amount-withdraw" /> */}
                                                        Action
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {fonctionArray?.length === 0 ? (
                                                    <StyledTableCell colSpan={8}>
                                                        <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                                                    </StyledTableCell>
                                                ) : (
                                                    fonctionArray
                                                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        .map((data, index) => (
                                                            <StyledTableRow
                                                                sx={{
                                                                    ':hover td': {
                                                                        cursor: 'pointer',
                                                                        backgroundColor: '#DDEDF9',
                                                                        color: 'black'
                                                                    }
                                                                }}
                                                                key={index}
                                                            >
                                                                <StyledTableCell align="left">{index + 1}</StyledTableCell>
                                                                <StyledTableCell align="left">{data?.designation}</StyledTableCell>
                                                                <StyledTableCell align="left">{data?.description}</StyledTableCell>
                                                                <StyledTableCell align="left">{data?.date_creation}</StyledTableCell>
                                                                <StyledTableCell align="left">
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
                                        count={fonctionArray?.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </MainCard>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default FunctionNew;
