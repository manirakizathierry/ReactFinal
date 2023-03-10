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
import { addService, deleteService, getAllservice, updateService } from 'store/userManagement/actionAgeDepSerFxTach/action';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
import * as yup from 'yup';
import { useFormik, useFormikContext, useField } from 'formik';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { Edit } from '@mui/icons-material';

const validationSchema = yup.object({
    designation: yup.string().required('designation est requis  ')
});

const initialValue = {
    id_service: '',
    designation: ''
};

const Service = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const services = useSelector((state) => state.agDepServTach.service);
    const [serviceArray, setServiceArray] = useState([]);
    const [serviceData, setServiceData] = useState(initialValue);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const onGetAllService = () => {
        UserManager.getAllServiceApi()
            .then((res) => {
                dispatch(getAllservice(res.result));
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

    const onSubmitData = (data) => {
        if (data.id_service === '') {
            console.log('add');
            const addToserver = {
                designation: data.designation
            };
            UserManager.addServiceApi(addToserver)
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
                    dispatch(addService(res.result));
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
        } else {
            console.log('update');
            const aupdateToserver = {
                designation: data.designation
            };
            console.log('id service', data.id_service);
            UserManager.updateServiceApi(data.id_service, aupdateToserver)
                .then((res) => {
                    console.log(res.result);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(updateService(res.result));
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
        }
    };

    const formik = useFormik({
        initialValues: serviceData,
        validationSchema,
        onSubmit: (data) => onSubmitData(data)
    });

    const resetData = () => {
        setServiceData({
            id_service: '',
            designation: ''
        });
        formik.resetForm();
    };

    const handleClickRow = (data) => {
        console.log(data);
        formik.setValues({
            id_service: data.id_service,
            designation: data.designation
        });
    };
    const handleDeleteService = () => {
        // deleteDepartement
        UserManager.deleteServiceApi(formik.values.id_service)
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
                dispatch(deleteService(formik.values.id_service));
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

    useEffect(() => {
        onGetAllService();
    }, []);

    useEffect(() => {
        setServiceArray(services);
    }, [services]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
                <TypographyListHeader text="Service" />
            </Grid>
            <Grid item xs={12} lg={12}>
                <TypographyListDescription text="Service" />
            </Grid>
            {loading && <UIProgress />}
            <Grid item xs={12} lg={12}>
                <form onSubmit={formik.handleSubmit} id="form-validation-withdraw">
                    <MainCard>
                        <Grid container spacing={gridSpacing} justifyContent="center">
                            <Grid item xs={12} lg={3}>
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

                            <Grid item xs={12} lg={3} mt={2.5}>
                                <Button
                                    startIcon={formik.values.id_service === '' ? <SaveIcon /> : <EditIcon />}
                                    type="submit"
                                    size="small"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    {formik.values.id_service === '' ? <FormattedMessage id="save" /> : <FormattedMessage id="edit" />}
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={3} mt={2.5}>
                                <Button startIcon={<CachedIcon />} size="small" fullWidth variant="outlined" onClick={() => resetData()}>
                                    <FormattedMessage id="reset" />
                                </Button>
                            </Grid>
                            <Grid item xs={12} lg={3} mt={2.5}>
                                <Button
                                    disabled={formik.values.id_service === ''}
                                    startIcon={<DeleteIcon />}
                                    size="small"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        background: theme.palette.warning.dark,
                                        '&:hover': { background: theme.palette.warning.main },
                                        color: 'grey.900'
                                    }}
                                    onClick={() => handleDeleteService()}
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
                                            {/* <FormattedMessage id="amount-withdraw" /> */}
                                            Action
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {serviceArray?.length === 0 ? (
                                        <StyledTableCell colSpan={8}>
                                            <WarningMessage message={<FormattedMessage id="aucune-donnee" />} type="info" />
                                        </StyledTableCell>
                                    ) : (
                                        serviceArray?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                                            <StyledTableRow
                                                sx={{
                                                    ':hover td': { cursor: 'pointer', backgroundColor: '#DDEDF9', color: 'black' },
                                                    m: -1
                                                }}
                                                key={index}
                                            >
                                                <StyledTableCell align="left">{index + 1}</StyledTableCell>

                                                <StyledTableCell align="left">{data?.designation}</StyledTableCell>

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
                            count={serviceArray?.length}
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

export default Service;
