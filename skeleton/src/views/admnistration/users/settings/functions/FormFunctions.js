import { Cached, Save } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { insertUserArch } from 'api/userAPI';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
import UIProgress from 'views/ui-elements/advance/UIProgress';

const FormFunctions = ({ rowSelected, setRowSelected }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const intl = useIntl();
    const { departments, services, functionsUser } = useSelector((state) => state.userSettings);
    const [functionUser, setFunctionUser] = useState({ designation: '', code: '' });
    const [error, setError] = useState({ designation: '', code: '' });
    const onChange = (e) => {
        if (e.target.name === 'designation') {
            setFunctionUser({ ...functionUser, designation: e.target.value });
        } else {
            setFunctionUser({ ...functionUser, code: e.target.value });
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const functionsUsers = functionsUser.slice();
        if (functionUser.designation === '' || functionUser.code === '') {
            setError({
                designation: functionUser.designation === '' ? intl.formatMessage({ id: 'required' }) : '',
                code: functionUser.code === '' ? intl.formatMessage({ id: 'required' }) : ''
            });
        } else {
            if (rowSelected.id_fonction) {
                functionsUsers.forEach((dp) => {
                    if (dp.id_fonction === rowSelected.id_fonction) {
                        dp.designation = functionUser.designation;
                        dp.code = functionUser.code;
                    }
                });
                setLoading(true);
                insertUserArch(
                    'fonction',
                    {
                        code: functionUser.code,
                        designation: functionUser.designation,
                        description: ''
                    },
                    'PUT',
                    rowSelected.id_fonction
                )
                    .then((res) => {
                        if (res.success) {
                            console.log(res);
                            dispatch({ type: 'USER@FUNCTIONS', functionsList: functionsUser });
                            setLoading(false);
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
                            setLoading(false);
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
                // dispatch({ type: 'USER@FUNCTIONS', functionsList: functionsUsers });
                setRowSelected({});
            } else {
                setLoading(true);
                insertUserArch(
                    'fonction',
                    {
                        code: functionUser.code,
                        designation: functionUser.designation,
                        description: ''
                    },
                    'POST'
                )
                    .then((res) => {
                        console.log(res);
                        if (res.success) {
                            functionsUsers.push(res.result);
                            dispatch({ type: 'USER@FUNCTIONS', functionsList: functionsUsers });
                            setLoading(false);
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
                            setLoading(false);
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
                // dispatch({ type: 'USER@FUNCTIONS', functionsList: functionsUsers });
            }
            setError({ designation: '', code: '' });
            setFunctionUser({ designation: '', code: '' });
        }
    };
    useEffect(() => {
        setFunctionUser(
            rowSelected.id_fonction ? { designation: rowSelected.designation, code: rowSelected.code } : { designation: '', code: '' }
        );
    }, [rowSelected]);
    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={1}>
                {loading && <UIProgress />}
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <InputLabel>
                                <Typography variant="subtitle1" color="black">
                                    <FormattedMessage id="designation" />
                                </Typography>
                            </InputLabel>
                            <TextField
                                value={functionUser.designation}
                                fullWidth
                                size="small"
                                name="designation"
                                onChange={onChange}
                                error={error.designation !== ''}
                                helperText={error.designation !== '' && error.designation}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel>
                                <Typography variant="subtitle1" color="black">
                                    <FormattedMessage id="code" />
                                </Typography>
                            </InputLabel>
                            <TextField
                                value={functionUser.code}
                                fullWidth
                                size="small"
                                name="code"
                                onChange={onChange}
                                error={error.code !== ''}
                                helperText={error.code !== '' && error.code}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: 3 }}>
                    <Button fullWidth size="small" type="submit" variant="contained" startIcon={<Save />} sx={{}}>
                        {rowSelected.id_fonction ? <FormattedMessage id="edit" /> : <FormattedMessage id="save" />}
                    </Button>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: 3 }}>
                    <Button
                        variant="contained"
                        color="action"
                        size="small"
                        fullWidth
                        startIcon={<Cached />}
                        onClick={() => {
                            setRowSelected({});
                            setFunctionUser({ designation: '', code: '' });
                        }}
                    >
                        <FormattedMessage id="reset" />
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormFunctions;
