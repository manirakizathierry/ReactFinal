import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid, TextField, CardActions, MenuItem } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { SNACKBAR_OPEN } from 'store/actions';
import InputLabel from 'ui-component/extended/Form/InputLabel';
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
import TypographyListHeader from 'ui-component/TypographyListHeader';
import DatePickerComponent from 'ui-component/DatePickerComponent';
import { UserManager } from 'api/life/userManager/UserManager';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { updateAffectation, addAffectation } from 'store/userManagement/affectation/action';

const validationSchemaData = yup.object({
    id_utilisateur: yup.string("Choisis l'utilisateur").required('Utilisateur est obligatoire'),
    id_departement: yup.string('Choisis le departement').required('Departement est obligatoire'),
    id_service: yup.string('Choisis la service').required('Service est obligatoire'),
    id_agence: yup.string("Choisis l'agence").required('Agence est obligatoire'),
    id_fonction: yup.string('Choisis la fonction').required('Fonction est obligatoire'),
    dateDebut: yup.string().required('Date Debut est obligatoire')
});

const CreatePosition = ({ open, handleClose, createPositionToEdit }) => {
    const userLocal = JSON.parse(window.localStorage.getItem('users'));
    const theme = useTheme();
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.users.usersArray);
    const fonctions = useSelector((state) => state.agDepServTach.fonction);
    const agences = useSelector((state) => state.agDepServTach.agence);
    const departments = useSelector((state) => state.agDepServTach.departement);
    const services = useSelector((state) => state.agDepServTach.service);
    const [loading, setLoading] = useState(false);
    const [createPosition, setCreatePosition] = useState({
        id: createPositionToEdit.id,
        id_utilisateur: createPositionToEdit.id_utilisateur,
        id_departement: createPositionToEdit.id_departement,
        id_agence: createPositionToEdit.id_agence,
        id_service: createPositionToEdit.id_service,
        id_fonction: createPositionToEdit.id_fonction,
        dateDebut: createPositionToEdit.dateDebut
    });

    const formik = useFormik({
        initialValues: createPosition,
        validationSchema: validationSchemaData,
        onSubmit: (data) => {
            if (data.id) {
                console.log('update', data);
                const updateTosendServer = {
                    idUtilisateur: data.id_utilisateur,
                    idFonction: data.id_fonction,
                    dateDebut: data.dateDebut,
                    idService: data.id_service,
                    idDepartement: data.id_departement,
                    idAgence: data.id_agence
                };
                setLoading(true);
                UserManager.updateAffectationApi(data.id, updateTosendServer)
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
                        setLoading(false);
                        dispatch(updateAffectation(res.result));
                        handleClose();
                    })
                    .catch((error) => {
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
                const dataTosendServer = {
                    idUtilisateur: data.id_utilisateur,
                    idFonction: data.id_fonction,
                    dateDebut: data.dateDebut,
                    idService: data.id_service,
                    idDepartement: data.id_departement,
                    idAgence: data.id_agence,
                    utilisateurcreation: userLocal.id_utilisateur
                };

                setLoading(true);
                console.log('add dataTosendServer', dataTosendServer);
                UserManager.addAffectationApi(dataTosendServer)
                    .then((res) => {
                        if (res.success) {
                            console.log('res,', res.result);
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: res.message,
                                variant: 'alert',
                                alertSeverity: 'success',
                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                close: true
                            });
                            dispatch(addAffectation(res.result));
                            setLoading(false);
                            handleClose();
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
                        }
                    })
                    .catch((error) => {
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
            }
        }
    });

    const reseData = () => [formik.resetForm()];

    return (
        <div>
            <Dialog
                aria-describedby="alert-dialog-slide-description"
                disableEscapeKeyDown
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                        {loading && <UIProgress />}
                        <Grid item xs={12} lg={2} justifyContent="flex-start">
                            <TypographyListHeader text="Position" />
                        </Grid>

                        <Grid item xs={12} lg={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1" color="black">
                                            <FormattedMessage id="user" />
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            id="id_utilisateur"
                                            value={formik.values.id_utilisateur}
                                            onChange={formik.handleChange}
                                            name="id_utilisateur"
                                            error={formik.touched.id_utilisateur && Boolean(formik.errors.id_utilisateur)}
                                            helperText={formik.touched.id_utilisateur && formik.errors.id_utilisateur}
                                        >
                                            {dataredux?.map((us, indx) => (
                                                <MenuItem key={indx} value={us.id_utilisateur}>
                                                    {us.nom.toUpperCase()} {us?.prenom.toUpperCase()}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1" color="black">
                                            <FormattedMessage id="agency" />
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            id="id_agence"
                                            name="id_agence"
                                            value={formik.values.id_agence}
                                            onChange={formik.handleChange}
                                            size="small"
                                            error={formik.touched.id_agence && Boolean(formik.errors.id_agence)}
                                            helperText={formik.touched.id_agence && formik.errors.id_agence}
                                        >
                                            {agences?.map((ag, indx) => (
                                                <MenuItem key={indx} value={ag.id_agence}>
                                                    {ag?.designation.toUpperCase()}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1" color="black">
                                            <FormattedMessage id="departments" />
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            id="id_departement"
                                            name="id_departement"
                                            size="small"
                                            value={formik.values.id_departement}
                                            onChange={formik.handleChange}
                                            error={formik.touched.id_departement && Boolean(formik.errors.id_departement)}
                                            helperText={formik.touched.id_departement && formik.errors.id_departement}
                                        >
                                            {departments?.map((departement, indx) => (
                                                <MenuItem key={indx} value={departement.id_departement}>
                                                    {departement?.designation}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1" color="black">
                                            Services
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            id="id_service"
                                            name="id_service"
                                            size="small"
                                            value={formik.values.id_service}
                                            onChange={formik.handleChange}
                                            error={formik.touched.id_service && Boolean(formik.errors.id_service)}
                                            helperText={formik.touched.id_service && formik.errors.id_service}
                                        >
                                            {services?.map((svc, indx) => (
                                                <MenuItem key={indx} value={svc.id_service}>
                                                    {svc?.designation}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </InputLabel>
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1" color="black">
                                            <FormattedMessage id="function" />
                                        </Typography>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            id="id_fonction"
                                            name="id_fonction"
                                            value={formik.values.id_fonction}
                                            onChange={formik.handleChange}
                                            error={formik.touched.id_fonction && Boolean(formik.errors.id_fonction)}
                                            helperText={formik.touched.id_fonction && formik.errors.id_fonction}
                                        >
                                            {fonctions?.map((fx, indx) => (
                                                <MenuItem key={indx} value={fx.id_fonction}>
                                                    {fx.designation}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </InputLabel>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1">
                                            <FormattedMessage id="startDat" />
                                        </Typography>
                                    </InputLabel>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePickerComponent
                                            name="dateDebut"
                                            id="dateDebut"
                                            value={formik.values.dateDebut ? formik.values.dateDebut : null}
                                            handleChange={(value) => {
                                                formik.setFieldValue('dateDebut', value.toISOString().slice(0, 10));
                                            }}
                                            error={formik.touched.dateDebut && Boolean(formik.errors.dateDebut)}
                                            helperText={formik.touched.dateDebut && formik.errors.dateDebut}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} lg={12} mb={2}>
                                    <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                        <Grid item lg={4}>
                                            <Button fullWidth type="submit" size="small" variant="contained" color="primary">
                                                <FormattedMessage id="save" />
                                            </Button>
                                        </Grid>
                                        <Grid item lg={4}>
                                            <Button fullWidth size="small" variant="outlined" color="primary" onClick={() => reseData()}>
                                                <FormattedMessage id="reset" />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        <FormattedMessage id="close" />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreatePosition;
