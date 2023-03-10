import React from 'react';
// material-ui
import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import Avatar1 from 'assets/images/users/avatar-1.png';
import { useFormik, useFormikContext, useField } from 'formik';
import * as yup from 'yup';
import InputField from 'ui-component/InputField';
import { FormattedMessage, useIntl } from 'react-intl';
import { userAPI } from 'api';
import { connect, useDispatch } from 'react-redux';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { SNACKBAR_OPEN } from 'store/actions';

const validationSchema = yup.object({
    nomUser: yup.string().required('Nom partenaire est obligatoire'),
    prenomUser: yup.string().required('Prénom partenaire est obligatoire'),
    emailUser: yup.string().email('Entrer Email valide').required('Email est obligatoire'),
    phoneNumber: yup
        .string()
        .min(8, 'Le numéro de télephone doit comporter au minimum 8 caractères')
        .max(8, 'Le numéro de télephone doit comporter au maximum 8 caractères')
        .required('Numéro de télephone est obligatoire'),
    numCARTE: yup.string().required('Numéro CIN est obligatoire'),
    userName: yup.string().required('Username est obligatoire')
});

const initialValues = {
    id: '',
    nomUser: '',
    prenomUser: '',
    emailUser: '',
    numCARTE: '',
    phoneNumber: '',
    userName: ''
};

// const macaddress = require('macaddress');

// function myUnixNetworkCardMacAddress() {
//     let macAddress;
//     const ifconfigOutput = system.exec('ifconfig');
//     return macAddress;
// }
// function myWindowsNetworkCardMacAddress() {
//     let macAddress;
//     const ipconfigOutput = system.exec('ipconfig /all');
//     return macAddress;
// }

const Profile = ({ userLocal }) => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const [loading, setLoading] = React.useState(false);
    const [yourState, setYourState] = React.useState({
        // id: userLocal.id_utilisateur,
        // nomUser: userLocal.Nom,
        // prenomUser: userLocal.Prenom,
        // emailUser: userLocal.Email,
        // numCARTE: userLocal.Cni,
        // phoneNumber: userLocal.Telephone,
        // userName: userLocal.name
    });

    // let macAddress;
    // if (navigator.platform.indexOf('Win') !== -1) {
    //     macAddress = myWindowsNetworkCardMacAddress();
    // } else {
    //     macAddress = myUnixNetworkCardMacAddress();
    // }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: yourState,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log('value of user information', values);
            const newUser = {
                id: values.id,
                nom: values.nomUser,
                prenom: values.prenomUser,
                telephone: values.phoneNumber,
                email: values.emailUser,
                cni: values.numCARTE,
                username: values.userName,
                updatedBy: values.id
            };
            setLoading(true);
            if (values.id) {
                userAPI
                    .updateUser(newUser)
                    .then((res) => {
                        console.log('response', res);
                        if (res.success) {
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
                        } else {
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: res.response.data.message,
                                variant: 'alert',
                                alertSeverity: 'warning',
                                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                                close: true
                            });
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            }
        }
    });
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={4}>
                <SubCard title="Profile Picture" contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar alt="User 1" src={Avatar1} sx={{ width: 100, height: 100, margin: '0 auto' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                Upload/Change Your Profile Image
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button variant="contained" size="small">
                                    Upload Avatar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item sm={6} md={8}>
                {/* {loading && <UIProgress />} */}
                <SubCard title="Edit Account Details">
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item md={6} xs={12}>
                                <InputField
                                    size="small"
                                    fullWidth
                                    label={`${intl.formatMessage({ id: 'firstName' })}`}
                                    id="nomUser"
                                    name="nomUser"
                                    value={formik.values?.nomUser}
                                    handleChange={formik.handleChange}
                                    error={formik.touched.nomUser && Boolean(formik.errors.nomUser)}
                                    helperText={formik.touched.nomUser && formik.errors.nomUser}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <InputField
                                    size="small"
                                    fullWidth
                                    label={`${intl.formatMessage({ id: 'lastName' })}`}
                                    id="prenomUser"
                                    name="prenomUser"
                                    value={formik.values?.prenomUser || ''}
                                    handleChange={formik.handleChange}
                                    error={formik.touched.prenomUser && Boolean(formik.errors.prenomUser)}
                                    helperText={formik.touched.prenomUser && formik.errors.prenomUser}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <InputField
                                    size="small"
                                    fullWidth
                                    label={`${intl.formatMessage({ id: 'email' })}`}
                                    id="emailUser"
                                    name="emailUser"
                                    value={formik.values?.emailUser || ''}
                                    handleChange={formik.handleChange}
                                    error={formik.touched.emailUser && Boolean(formik.errors.emailUser)}
                                    helperText={formik.touched.emailUser && formik.errors.emailUser}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <InputField
                                    size="small"
                                    fullWidth
                                    label={`${intl.formatMessage({ id: 'phoneNumber' })}`}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values?.phoneNumber || ''}
                                    handleChange={formik.handleChange}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <InputField
                                    size="small"
                                    fullWidth
                                    label={`${intl.formatMessage({ id: 'numCARTE' })}`}
                                    id="numCARTE"
                                    name="numCARTE"
                                    value={formik.values?.numCARTE || ''}
                                    handleChange={formik.handleChange}
                                    error={formik.touched.numCARTE && Boolean(formik.errors.numCARTE)}
                                    helperText={formik.touched.numCARTE && formik.errors.numCARTE}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <InputField
                                    size="small"
                                    fullWidth
                                    label={`${intl.formatMessage({ id: 'username' })}`}
                                    id="userName"
                                    name="userName"
                                    value={formik.values?.userName || ''}
                                    handleChange={formik.handleChange}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction="row">
                                    <AnimateButton>
                                        <Button type="submit" variant="contained">
                                            Change Details
                                        </Button>
                                    </AnimateButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default connect(null, {})(Profile);
