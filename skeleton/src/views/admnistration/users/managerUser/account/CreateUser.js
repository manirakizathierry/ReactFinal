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
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { IconEye, IconSearch } from '@tabler/icons';

import Typography from '@mui/material/Typography';
import { Grid, TextField, CardActions, MenuItem, InputAdornment, InputLabel } from '@mui/material';
import { connect, useDispatch } from 'react-redux';
// import { UserManager } from 'api/life/userManager/UserManager';
import { SNACKBAR_OPEN } from 'store/actions';
import { addUser, updateUser } from 'store/userManagement/actionUser/action';
import TypographyListHeader from 'ui-component/TypographyListHeader';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { userAPI } from 'api';

const CreateUser = ({ open, handleClose, createUserToEdit }) => {
    const validationSchema = yup.object({
        nom: yup.string('Entrer le nom').required('Nom est obligatoire'),
        prenom: yup.string('Entrer le prenom').required('Prenom est obligatoire'),
        telephone: yup.string().required('Numéro de télephone est obligatoire'),
        email: yup.string().email('Entrer Email valide').required('Email est obligatoire'),
        cni: yup.string().required('CNI est obligatoire'),
        username: yup.string().required('username est obligatoire')
        // password: yup.string().required('Password est obligatoire')
    });

    const userLocal = JSON.parse(window.localStorage.getItem('users'));
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
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
    // console.log(Object.values(createUserToEdit)[0] === '');

    const [createUser, setCreateUser] = useState({
        id: createUserToEdit.id,
        nom: createUserToEdit.nom,
        prenom: createUserToEdit.prenom,
        telephone: createUserToEdit.telephone,
        email: createUserToEdit.email,
        cni: createUserToEdit.cni,
        path: createUserToEdit.path,
        username: createUserToEdit.username
        // password: createUserToEdit.password
    });
    const [uploadFile, setUploadFile] = useState(
        createUserToEdit.path === ''
            ? new File([], '', {
                  type: 'text/plain'
              })
            : createUserToEdit.path
    );

    const [thumb, setThumb] = useState('');

    const fileSelectedHandler = (event) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumb(reader.result);
        };
        setUploadFile(event.target.files[0]);
    };

    const onSubmitData = (data) => {
        if (data.id !== '') {
            console.log('update', data);
            const formData = new FormData();
            formData.append('updatedBy', userLocal.id_utilisateur);
            formData.append('nom', data.nom);
            formData.append('prenom', data.prenom);
            formData.append('telephone', data.telephone);
            formData.append('email', data.email);
            formData.append('cni', data.cni);
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('img', uploadFile);
            setLoading(true);

            userAPI
                .updateUser(data.id, formData)
                .then((res) => {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(updateUser(res.result));
                    handleClose();
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('error', error.message);
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
            const formData = new FormData();
            console.log('data====>>>>>', data);
            formData.append('nom', data.nom);
            formData.append('prenom', data.prenom);
            formData.append('telephone', data.telephone);
            formData.append('email', data.email);
            formData.append('createdBy', userLocal.id_utilisateur);
            formData.append('cni', data.cni);
            formData.append('username', data.username);
            // formData.append('password', data.password);
            formData.append('img', uploadFile);

            setLoading(true);
            userAPI
                .saveUser(formData)
                .then((res) => {
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: res.message,
                        variant: 'alert',
                        alertSeverity: 'success',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    dispatch(addUser(res.result));
                    handleClose();
                    setLoading(false);
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
            // handleClose();
        }
    };

    const formik = useFormik({
        initialValues: createUser,
        validationSchema,
        onSubmit: (data) => onSubmitData(data)
    });

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
                    {loading && <UIProgress />}
                    <Grid container spacing={2} style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <Grid item xs={12} lg={12} justifyContent="flex-start">
                            <TypographyListHeader text="User" />
                        </Grid>
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
                                name="username"
                                type="username"
                                size="small"
                                disabled={formik.values.id}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                placeholder="Entrer username"
                            />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <InputLabel>
                                <FormattedMessage id="password" />
                            </InputLabel>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                type={seePasss}
                                size="small"
                                disabled={formik.values.id}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                // {formik.values.id===''}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                        </Grid> */}
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
                                        {/* <FormattedMessage id="save" /> */}
                                        {formik.values.id === '' ? <FormattedMessage id="save" /> : <FormattedMessage id="edit" />}
                                    </Button>
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
export default CreateUser;
