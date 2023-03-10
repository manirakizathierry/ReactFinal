import { Cached, Save } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import { insertUserArch } from 'api/userAPI';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IconSearch } from '@tabler/icons';
import { SNACKBAR_OPEN } from 'store/actions';
import UIProgress from 'views/ui-elements/advance/UIProgress';

const FormDepartment = ({ rowSelected, setRowSelected }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const intl = useIntl();
    const { departments, agences } = useSelector((state) => state.userSettings);

    const [entitled, setEntitled] = useState({ designation: '' });
    const [error, setError] = useState({ designation: '' });
    const onChange = (e) => {
        if (e.target.name === 'designation') {
            setEntitled({ ...entitled, designation: e.target.value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const departmentss = departments.slice();
        if (entitled.designation === '') {
            setError({
                designation: entitled.designation === '' ? intl.formatMessage({ id: 'required' }) : ''
            });
        } else {
            if (rowSelected.id_departement) {
                departmentss.forEach((dp) => {
                    if (dp.id_departement === rowSelected.id_departement) {
                        dp.designation = entitled.designation;
                    }
                });
                setLoading(true);
                insertUserArch(
                    'departement',
                    {
                        designation: entitled.designation
                        // id_agence: engence.agenceId
                    },
                    'PUT',
                    rowSelected.id_departement
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
                            setLoading(false);
                        } else {
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: res.message,
                                variant: 'alert',
                                alertSeverity: 'success',
                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                close: true
                            });
                            setLoading(false);
                            console.log(res);
                            dispatch({ type: 'USER@DEPARTMENTS', departmentsList: departmentss });
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
                        setLoading(false);
                    });
                setRowSelected({});
            } else {
                setLoading(true);
                insertUserArch(
                    'departement',
                    {
                        designation: entitled.designation
                        // id_agence: engence.agenceId
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
                            setLoading(false);
                        } else {
                            console.log(res);
                            departmentss.push(res.result);
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: res.message,
                                variant: 'alert',
                                alertSeverity: 'success',
                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                close: true
                            });
                            setLoading(false);
                            dispatch({ type: 'USER@DEPARTMENTS', departmentsList: departmentss });
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
                        setLoading(false);
                    });
            }
            setEntitled({ designation: '' });
            setError({ designation: '' });
        }
    };
    useEffect(() => {
        setEntitled(rowSelected.id_departement ? { designation: rowSelected.designation } : { designation: '' });
    }, [rowSelected]);

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
                {loading && <UIProgress />}
                <Grid item xs={6}>
                    <InputLabel>
                        <Typography variant="subtitle1" color="black">
                            <FormattedMessage id="designation" />
                        </Typography>
                    </InputLabel>
                    <TextField
                        fullWidth
                        size="small"
                        name="designation"
                        value={entitled.designation}
                        onChange={onChange}
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
                    <Button size="small" type="submit" fullWidth variant="contained" startIcon={<Save />} sx={{}}>
                        {rowSelected.designation ? <FormattedMessage id="edit" /> : <FormattedMessage id="save" />}
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
                            setEntitled({ designation: '' });
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

FormDepartment.propTypes = {
    rowSelected: PropTypes.object.isRequired,
    setRowSelected: PropTypes.func.isRequired
};

export default FormDepartment;
