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
import SaveIcon from '@mui/icons-material/Save';

import Typography from '@mui/material/Typography';
import { Grid, TextField, CardActions, MenuItem, InputAdornment } from '@mui/material';

import { connect, useDispatch } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { SNACKBAR_OPEN } from 'store/actions';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { addUser, updateUser } from 'api/userAPI';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { IconEye, IconSearch } from '@tabler/icons';

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
    nom: yup.string('Entrer le nom').required('Nom est obligatoire'),
    prenom: yup.string('Entrer le prenom').required('Prenom est obligatoire'),
    telephone: yup.string().required('Numéro de télephone est obligatoire'),
    email: yup.string().email('Entrer Email valide').required('Email est obligatoire'),
    cni: yup.string().required('CNI est obligatoire'),
    // path: yup.string(),
    usernameCreate: yup.string().required('Username est obligatoire'),
    passwordCreate: yup.string().required('Password est obligatoire')
});

const CreateUser = ({ open, addUser, updateUser, setOpen, handleCloseDialog, userToEdit }) => {
    console.log('User: ', userToEdit);
    const handleClose = () => {
        setOpen(false);
    };
    const theme = useTheme();
    const dispatch = useDispatch();
    const [fullWidth, setFullWidth] = useState(true);

    const [maxWidth, setMaxWidth] = useState('md');

    const [uploadFile, setUploadFile] = useState(
        userToEdit.path === ''
            ? new File([], '', {
                  type: 'text/plain'
              })
            : userToEdit.path
    );
    const [thumb, setThumb] = useState('');

    const fileSelectedHandler = (event) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumb(reader.result);
        };
        setUploadFile(event.target.files[0]);
    };

    const formik = useFormik({
        initialValues: {
            nom: userToEdit.nom,
            prenom: userToEdit.prenom,
            telephone: userToEdit.telephone,
            email: userToEdit.email,
            cni: userToEdit.cni,
            // path: userToEdit.path,
            usernameCreate: userToEdit.username,
            passwordCreate: userToEdit.password
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const newCustomer = {
                id: values.id,
                nom: values.nom,
                prenom: values.prenom,
                telephone: values.telephone,
                email: values.email,
                cni: values.cni,
                // path: values.path,
                username: values.username,
                password: values.password,
                img: uploadFile
            };
            const formData = new FormData();
            formData.append('id', values.id);
            formData.append('nom', values.nom);
            formData.append('prenom', values.prenom);
            formData.append('telephone', values.telephone);
            formData.append('email', values.email);
            formData.append('cni', values.cni);
            // formData.append('fonction', values.fonction);
            formData.append('username', values.usernameCreate);
            formData.append('password', values.passwordCreate);
            formData.append('img', uploadFile);
            if (userToEdit.id_utilisateur) {
                const val = { formData, id: userToEdit.id_utilisateur };
                updateUser(formData, userToEdit.id_utilisateur)
                    .then((res) => {
                        console.log('res test data===>> when success', res);
                        if (res === 'success') {
                            resetForm();
                            handleCloseDialog();
                        }
                    })
                    .catch((error) => {
                        console.log('error test data===>> ', error);
                    });
            } else {
                addUser(formData)
                    .then((res) => {
                        console.log('res test data===>> when success', res);
                        if (res === 'success') {
                            resetForm();
                            handleCloseDialog();
                        }
                    })
                    .catch((error) => {
                        console.log('error test data===>> ', error);
                    });
            }
        }
    });
    const [seePasss, setSeePasss] = useState('password');
    const seePass = () => {
        if (seePasss === 'password') {
            setSeePasss((prev) => {
                prev = 'text';
                return prev;
            });
        } else {
            setSeePasss((prev) => {
                prev = 'password';
                return prev;
            });
        }
    };

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
                    <FormattedMessage id="user" />
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={6}>
                                <InputLabel>
                                    <FormattedMessage id="nom" />
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    id="nom"
                                    name="nom"
                                    size="small"
                                    value={formik.values.nom}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nom && Boolean(formik.errors.nom)}
                                    helperText={formik.touched.nom && formik.errors.nom}
                                    placeholder="Entrer le nom"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <FormattedMessage id="prenom" />
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    id="prenom"
                                    name="prenom"
                                    type="prenom"
                                    size="small"
                                    value={formik.values.prenom}
                                    onChange={formik.handleChange}
                                    error={formik.touched.prenom && Boolean(formik.errors.prenom)}
                                    helperText={formik.touched.prenom && formik.errors.prenom}
                                    placeholder="Entrer le prenom"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <FormattedMessage id="phoneNumber" />
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    id="telephone"
                                    name="telephone"
                                    value={formik.values.telephone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                                    helperText={formik.touched.telephone && formik.errors.telephone}
                                    placeholder="Entrer le numéro de télephone"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>Email</InputLabel>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    size="small"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    placeholder="Entrer l'Email"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>CNI</InputLabel>
                                <TextField
                                    fullWidth
                                    id="cni"
                                    name="cni"
                                    type="cni"
                                    size="small"
                                    value={formik.values.cni}
                                    onChange={formik.handleChange}
                                    error={formik.touched.cni && Boolean(formik.errors.cni)}
                                    helperText={formik.touched.cni && formik.errors.cni}
                                    placeholder="Entrer cni"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel>
                                    <FormattedMessage id="updoadImage" />
                                </InputLabel>
                                <TextField size="small" type="file" fullWidth onChange={fileSelectedHandler} />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <FormattedMessage id="username" />
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    id="username"
                                    name="usernameCreate"
                                    type="username"
                                    size="small"
                                    // disabled={userToEdit.id_utilisateur}
                                    value={formik.values.usernameCreate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.usernameCreate && Boolean(formik.errors.usernameCreate)}
                                    helperText={formik.touched.usernameCreate && formik.errors.usernameCreate}
                                    placeholder="Entrer username"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel>
                                    <FormattedMessage id="password" />
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="passwordCreate"
                                    type={seePasss}
                                    size="small"
                                    disabled={userToEdit.id_utilisateur}
                                    value={formik.values.passwordCreate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.passwordCreate && Boolean(formik.errors.passwordCreate)}
                                    helperText={formik.touched.passwordCreate && formik.errors.passwordCreate}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={seePass} edge="end">
                                                    <IconEye stroke={1.5} size="1rem" />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Entrer password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            startIcon={<SaveIcon />}
                                            type="submit"
                                            size="small"
                                            variant="contained"
                                            color="primary"
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
                        <FormattedMessage id="close" />
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

CreateUser.propTypes = {
    // addUser: PropTypes.func.isRequired,
};

export default connect(null, { addUser, updateUser })(CreateUser);
