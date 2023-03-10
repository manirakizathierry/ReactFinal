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

import { connect, useDispatch } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { SNACKBAR_OPEN } from 'store/actions';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { addAffectation, updateAffectation } from 'api/userAPI';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import moment from 'moment';
// import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    id_utilisateur: yup.string("Choisis l'utilisateur").required('Utilisateur est obligatoire'),
    id_departement: yup.string('Choisis le departement').required('Departement est obligatoire'),
    id_service: yup.string('Choisis la service').required('Service est obligatoire'),
    id_agence: yup.string("Choisis l'agence").required('Agence est obligatoire'),
    id_fonction: yup.string('Choisis la fonction').required('Fonction est obligatoire'),
    dateDebut: yup.string().required('Date Debut est obligatoire')
});

const CreatePosition = ({
    userSettings: { functionsUser, services, departments, agences },
    user: { users },
    open,
    addAffectation,
    updateAffectation,
    setOpen,
    handleCloseDialog,
    affectationUser
}) => {
    // console.log('Affectation: ', affectationUser);
    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    const dispatch = useDispatch();
    const [fullWidth, setFullWidth] = useState(true);
    // const { departments, services, functionsUser } = useSelector((state) => state.userSettings);

    const [maxWidth, setMaxWidth] = useState('md');

    const formik = useFormik({
        initialValues: {
            id_utilisateur: affectationUser.idUtilisateur,
            id_departement: affectationUser.idDepartement,
            id_agence: affectationUser.idAgence,
            id_service: affectationUser.idService,
            id_fonction: affectationUser.idFonction,
            dateDebut: affectationUser.dateDebut
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const newCustomer = {
                // id: values.id,

                // comment by euro
                // id_utilisateur: values.id_utilisateur,
                // id_fonction: values.id_fonction,
                // date_debut: values.dateDebut.toISOString().slice(0, 10)

                idUtilisateur: values.id_utilisateur,
                idFonction: values.id_fonction,
                dateDebut: '2022-09-02',
                idService: '7',
                idDepartement: '15',
                idAgence: '20'
            };
            console.log(newCustomer);

            const formData = new FormData();
            // formData.append('id', values.id);
            formData.append('id_utilisateur', values.id_utilisateur);
            formData.append('id_fonction', values.id_fonction);
            formData.append('date_debut', values.dateDebut.toISOString().slice(0, 10));
            console.log(formData);
            // console.log(values);
            if (affectationUser.id_affectation) {
                // const val = { formData, id: affectationUser.id_affectation };
                updateAffectation(formData, affectationUser.id_affectation);
            } else {
                addAffectation(newCustomer);
            }
            resetForm();
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
            handleCloseDialog();
        }
    });

    return (
        <div>
            <BootstrapDialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    <FormattedMessage id="affectation" />
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="black">
                                        <FormattedMessage id="user" />
                                    </Typography>
                                </InputLabel>
                                <TextField
                                    select
                                    fullWidth
                                    id="id_utilisateur"
                                    name="id_utilisateur"
                                    size="small"
                                    value={formik.values.id_utilisateur}
                                    onChange={formik.handleChange}
                                    error={formik.touched.id_utilisateur && Boolean(formik.errors.id_utilisateur)}
                                    helperText={formik.touched.id_utilisateur && formik.errors.id_utilisateur}
                                    // placeholder="Entrer le nom"
                                >
                                    {users.map((us, indx) => (
                                        <MenuItem key={indx} value={us.id_utilisateur}>
                                            {us?.nom.toUpperCase()} {us?.prenom.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="black">
                                        <FormattedMessage id="agency" />
                                    </Typography>
                                </InputLabel>
                                <TextField
                                    select
                                    fullWidth
                                    id="id_agence"
                                    name="id_agence"
                                    size="small"
                                    value={formik.values.id_agence}
                                    onChange={(e) => {
                                        formik.setValues({
                                            id_utilisateur: formik.values.id_utilisateur,
                                            id_agence: e.target.value,
                                            id_departement: 0,
                                            id_fonction: 0,
                                            id_service: 0
                                        });
                                    }}
                                    error={formik.touched.id_agence && Boolean(formik.errors.id_agence)}
                                    helperText={formik.touched.id_agence && formik.errors.id_agence}
                                    // placeholder="Entrer le nom"
                                >
                                    {agences.map((ag, indx) => (
                                        <MenuItem key={indx} value={ag.id_agence}>
                                            {ag?.designation.toUpperCase()}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="black">
                                        <FormattedMessage id="departments" />
                                    </Typography>
                                </InputLabel>
                                <TextField
                                    select
                                    fullWidth
                                    id="id_departement"
                                    name="id_departement"
                                    size="small"
                                    value={formik.values.id_departement}
                                    onChange={(e) => {
                                        formik.setValues({
                                            id_utilisateur: formik.values.id_utilisateur,
                                            id_agence: formik.values.id_agence,
                                            id_departement: e.target.value,
                                            id_fonction: 0,
                                            id_service: 0
                                        });
                                    }}
                                    error={formik.touched.id_departement && Boolean(formik.errors.id_departement)}
                                    helperText={formik.touched.id_departement && formik.errors.id_departement}
                                    // placeholder="Entrer le nom"
                                >
                                    {departments
                                        // .filter((dp1) => dp1.id_agence === formik.values.id_agence)
                                        .map((dp, indx) => (
                                            <MenuItem key={indx} value={dp.id_departement}>
                                                {dp?.designation.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="black">
                                        Services
                                    </Typography>
                                </InputLabel>
                                <TextField
                                    select
                                    fullWidth
                                    id="id_service"
                                    name="id_service"
                                    size="small"
                                    value={formik.values.id_service}
                                    onChange={(e) => {
                                        formik.setValues({
                                            id_utilisateur: formik.values.id_utilisateur,
                                            id_agence: formik.values.id_agence,
                                            id_departement: formik.values.id_departement,
                                            id_service: e.target.value,
                                            id_fonction: 0
                                        });
                                    }}
                                    error={formik.touched.id_service && Boolean(formik.errors.id_service)}
                                    helperText={formik.touched.id_service && formik.errors.id_service}
                                    // placeholder="Entrer le nom"
                                >
                                    {services
                                        // .filter((sr) => sr.id_departement === formik.values.id_departement)
                                        .map((serv, indx) => (
                                            <MenuItem key={indx} value={serv.id_service}>
                                                {serv?.designation.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="black">
                                        <FormattedMessage id="function" />
                                    </Typography>
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    select
                                    id="id_fonction"
                                    name="id_fonction"
                                    size="small"
                                    value={formik.values.id_fonction}
                                    onChange={formik.handleChange}
                                    error={formik.touched.id_fonction && Boolean(formik.errors.id_fonction)}
                                    helperText={formik.touched.id_fonction && formik.errors.id_fonction}
                                    // placeholder="Entrer le prenom"
                                >
                                    {functionsUser
                                        // .filter((f) => f.idservice === formik.values.id_service)
                                        .map((fu, indx) => (
                                            <MenuItem key={indx} value={fu.id_fonction}>
                                                {fu?.designation.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <Typography variant="subtitle1" color="black">
                                        <FormattedMessage id="startDat" />
                                    </Typography>
                                </InputLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        size="small"
                                        name="dateDebut"
                                        id="dateDebut"
                                        value={new Date(formik.values.dateDebut)}
                                        onChange={(newValue) => formik.setFieldValue('dateDebut', newValue)}
                                        error={formik.touched.dateDebut && Boolean(formik.errors.dateDebut)}
                                        renderInput={(params) => <TextField size="small" fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            type="submit"
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => console.log(formik.values)}
                                        >
                                            <FormattedMessage id="save" />
                                        </Button>
                                    </Grid>
                                    {/* <Grid item xs={4}>
                                        <Button fullWidth size="small" variant="outlined">
                                            Réinitialiser
                                        </Button>
                                    </Grid> */}
                                    {/* <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            size="small"
                                            variant="contained"
                                            style={{ background: theme.palette.error.main, borderColor: '#EDE7F6' }}
                                        >
                                            Suprimer
                                        </Button>
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Fermer
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

CreatePosition.propTypes = {
    userSettings: PropTypes.object,
    user: PropTypes.object,
    addAffectation: PropTypes.func.isRequired,
    updateAffectation: PropTypes.func.isRequired,
    setOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    affectationUser: PropTypes.object.isRequired,
    services: PropTypes.object.isRequired,
    departments: PropTypes.object.isRequired,
    agences: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    userSettings: state.userSettings
});

export default connect(mapStateToProps, { addAffectation, updateAffectation })(CreatePosition);
