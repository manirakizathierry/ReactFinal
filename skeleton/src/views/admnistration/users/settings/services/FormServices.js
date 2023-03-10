import { Cached, Save } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { insertUserArch } from 'api/userAPI';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconSearch } from '@tabler/icons';
import { SNACKBAR_OPEN } from 'store/actions';

const FormServices = ({ rowSelected, setRowSelected }) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const { departments, services } = useSelector((state) => state.userSettings);
    const [service, setService] = useState({ designation: '' });
    const [errorDep, setErrorDep] = useState({ departementId: '' });

    const [error, setError] = useState({ designation: '' });
    const onChange = (e) => {
        console.log(e);
        if (e.target.name === 'designation') {
            setService({ ...service, designation: e.target.value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const servicess = services.slice();
        if (service.designation === '') {
            setError({
                designation: service.designation === '' ? intl.formatMessage({ id: 'required' }) : ''
            });
        } else {
            if (rowSelected.id_service) {
                servicess.forEach((dp) => {
                    if (dp.id_service === rowSelected.id_service) {
                        dp.designation = service.designation;
                    }
                });
                insertUserArch('service', { designation: service.designation }, 'PUT', rowSelected.id_service)
                    .then((res) => {
                        if (res.success === false) {
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: res.message,
                                variant: 'alert',
                                alertSeverity: 'warning',
                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                close: true
                            });
                        } else {
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
                            console.log(res);
                            servicess.push(res.result);
                            dispatch({ type: 'USER@SERVICES', servicesList: servicess });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${err.response?.data.message ? err.response.data.message : err.message}`,
                            variant: 'alert',
                            alertSeverity: 'error',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            close: true
                        });
                    });
                // console.log(rowSelected);
                // dispatch({ type: 'USER@SERVICES', servicesList: servicess });
            } else {
                insertUserArch(
                    'service',
                    {
                        designation: service.designation
                    },
                    'POST'
                )
                    .then((res) => {
                        if (res.success === false) {
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: res.message,
                                variant: 'alert',
                                alertSeverity: 'warning',
                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                close: true
                            });
                        } else {
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
                            servicess.push(res.result);
                            dispatch({ type: 'USER@SERVICES', servicesList: servicess });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: `${err.response?.data.message ? err.response.data.message : err.message}`,
                            variant: 'alert',
                            alertSeverity: 'error',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            close: true
                        });
                    });
            }
            setRowSelected({});
            setService({ designation: '' });
            setError({ designation: '' });
        }
    };
    useEffect(() => {
        // console.log(rowSelected);
        setService(
            rowSelected.id_service
                ? { designation: rowSelected.designation, id_departement: rowSelected.id_departement }
                : { designation: '' }
        );
    }, [rowSelected]);
    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={6}>
                    <InputLabel>
                        <Typography variant="subtitle1" color="black">
                            <FormattedMessage id="designation" />
                        </Typography>
                    </InputLabel>
                    <TextField
                        value={service.designation}
                        fullWidth
                        size="small"
                        name="designation"
                        onChange={onChange}
                        style={{ marginTop: -2 }}
                        error={error.designation !== ''}
                        helperText={
                            error.designation !== '' && (
                                <Typography color="red" variant="body1">
                                    {error.designation}
                                </Typography>
                            )
                        }
                    />
                </Grid>

                <Grid item xs={3} sx={{ marginTop: 2 }}>
                    <Button size="small" type="submit" variant="contained" fullWidth startIcon={<Save />} sx={{}}>
                        {rowSelected.id_service ? <FormattedMessage id="edit" /> : <FormattedMessage id="save" />}
                    </Button>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="action"
                        size="small"
                        fullWidth
                        startIcon={<Cached />}
                        onClick={() => {
                            setRowSelected({});
                            setService({ designation: '' });
                            setError({ designation: '' });
                        }}
                    >
                        <FormattedMessage id="reset" />
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

FormServices.propTypes = {
    rowSelected: PropTypes.object.isRequired,
    setRowSelected: PropTypes.func.isRequired
};

export default FormServices;
