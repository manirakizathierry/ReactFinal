import { Cached, Save } from '@mui/icons-material';
import { Box, Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { insertUserArch } from 'api/userAPI';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const FormAgences = ({ rowSelected, setRowSelected }) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const agences = useSelector((state) => state.userSettings.agences);
    const [entitled, setEntitled] = useState({ designation: '', adresse: '', societe: '' });
    // {
    //     "id_agence": 20,
    //     "designation": "GITEGA",
    //     "adresse": "MUKAZA",
    //     "id_societe": 8,
    //     "societe": "Jubilee Insurance Company Of Burundi"
    //   }
    const [error, setError] = useState({ designation: '', adresse: '', societe: '' });
    const onChange = (e) => {
        if (e.target.name === 'designation') {
            setEntitled({ ...entitled, designation: e.target.value });
        } else if (e.target.name === 'adresse') {
            setEntitled({ ...entitled, adresse: e.target.value });
        } else {
            setEntitled({ ...entitled, societe: e.target.value });
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const agencess = agences.slice();
        if (entitled.designation === '' || entitled.adresse === '' || entitled.societe === '') {
            setError({
                designation: entitled.designation === '' ? intl.formatMessage({ id: 'required' }) : '',
                adresse: entitled.adresse === '' ? intl.formatMessage({ id: 'required' }) : '',
                societe: entitled.societe === '' ? intl.formatMessage({ id: 'required' }) : ''
            });
        } else {
            if (rowSelected.id_agence) {
                agencess.forEach((dp) => {
                    if (dp.id_agence === rowSelected.id_agence) {
                        dp.designation = entitled.designation;
                        dp.adresse = entitled.adresse;
                        dp.societe = entitled.societe;
                    }
                });
                insertUserArch(
                    'agence',
                    {
                        designation: entitled.designation,
                        adresse: entitled.adresse,
                        id_societe: 8,
                        societe: entitled.societe
                    },
                    'PUT',
                    rowSelected.id_agence
                )
                    .then((res) => {
                        console.log(res);
                        dispatch({ type: 'USER@AGENCES', agencesList: agencess });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // insertUserArch('department', { designation: rowSelected.name });
                setRowSelected({});
            } else {
                console.log(entitled);
                const idDep = agences.length === 0 ? agences.length + 1 : agences[agences.length - 1].id_agence + 1;
                agencess.push({
                    id_agence: idDep,
                    designation: entitled.designation,
                    adresse: entitled.adresse,
                    id_societe: 8,
                    societe: entitled.societe
                });
                insertUserArch(
                    'agence',
                    {
                        designation: entitled.designation,
                        adresse: entitled.adresse,
                        id_societe: 8,
                        societe: entitled.societe
                    },
                    'POST'
                )
                    .then((res) => {
                        console.log(res);
                        dispatch({ type: 'USER@AGENCES', agencesList: agencess });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            setEntitled({ designation: '', adresse: '', societe: '' });
            setError({ designation: '', adresse: '', societe: '' });
        }
    };
    useEffect(() => {
        setEntitled(
            rowSelected.id_agence
                ? { designation: rowSelected.designation, adresse: rowSelected.adresse, societe: rowSelected.societe }
                : { designation: '', adresse: '', societe: '' }
        );
    }, [rowSelected]);

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                            <InputLabel>
                                <Typography variant="subtitle1" color="black">
                                    <FormattedMessage id="society" />
                                </Typography>
                            </InputLabel>
                            <TextField
                                fullWidth
                                size="small"
                                name="societe"
                                value={entitled.societe}
                                onChange={onChange}
                                style={{ marginTop: -2 }}
                                error={error.societe !== ''}
                                helperText={
                                    error.societe !== '' && (
                                        <Typography color="red" variant="body1">
                                            {error.societe}
                                        </Typography>
                                    )
                                }
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <InputLabel>
                                <Typography variant="subtitle1" color="black">
                                    <FormattedMessage id="address" />
                                </Typography>
                            </InputLabel>
                            <TextField
                                fullWidth
                                size="small"
                                name="adresse"
                                value={entitled.adresse}
                                onChange={onChange}
                                style={{ marginTop: -2 }}
                                error={error.adresse !== ''}
                                helperText={
                                    error.adresse !== '' && (
                                        <Typography color="red" variant="body1">
                                            {error.adresse}
                                        </Typography>
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, marginTop: -3, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Button size="small" type="submit" variant="contained" startIcon={<Save />} sx={{}}>
                            {rowSelected.designation ? <FormattedMessage id="edit" /> : <FormattedMessage id="save" />}
                        </Button>
                        <Button
                            variant="contained"
                            color="action"
                            size="small"
                            startIcon={<Cached />}
                            onClick={() => {
                                setRowSelected({});
                                setEntitled('');
                                setError('');
                            }}
                        >
                            <FormattedMessage id="reset" />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

FormAgences.propTypes = {
    rowSelected: PropTypes.object.isRequired,
    setRowSelected: PropTypes.func.isRequired
};

export default FormAgences;
