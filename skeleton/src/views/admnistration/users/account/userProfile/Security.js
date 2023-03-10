import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, IconButton, InputAdornment, Stack, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useFormik, useFormikContext, useField } from 'formik';
import InputField from 'ui-component/InputField';
import { FormattedMessage, useIntl } from 'react-intl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as yup from 'yup';
// import * as api from 'api/userAPI';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';

const validationSchema = yup.object({
    userName: yup.string().required('Username is required'),
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().required('Password is required').min(5, 'Your password is too short.'),
    reNewPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

const initialValues = {
    id: '',
    userName: '',
    currentPassword: '',
    newPassword: '',
    reNewPassword: ''
};

const Security = ({ userLocal }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [yourState, setYourState] = React.useState(initialValues);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const intl = useIntl();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { ...yourState, id: userLocal?.id_utilisateur },
        validationSchema,
        onSubmit: (values) => {
            const newUser = {
                id: values.id,
                userName: values.userName,
                currentPassword: values.currentPassword,
                newPassword: values.newPassword
            };
            console.log(newUser);
            // if (newUser.id) {
            //     setLoading(true);
            //     api.updatePasswordUser(newUser)
            //         .then((res) => {
            //             if (res.success) {
            //                 dispatch({
            //                     type: SNACKBAR_OPEN,
            //                     open: true,
            //                     message: res.message,
            //                     variant: 'alert',
            //                     alertSeverity: 'success',
            //                     anchorOrigin: { vertical: 'top', horizontal: 'right' },
            //                     close: true
            //                 });
            //                 setLoading(false);
            //             } else {
            //                 dispatch({
            //                     type: SNACKBAR_OPEN,
            //                     open: true,
            //                     message: res.response.data.message,
            //                     variant: 'alert',
            //                     alertSeverity: 'warning',
            //                     anchorOrigin: { vertical: 'top', horizontal: 'right' },
            //                     close: true
            //                 });
            //                 setLoading(false);
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //             setLoading(false);
            //         });
            // }
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item sm={6} md={8}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {loading && <UIProgress />}
                        <SubCard title="Change Password">
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12}>
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
                                        <InputField
                                            size="small"
                                            fullWidth
                                            label={<FormattedMessage id="currentPassword" />}
                                            id="currentPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            name="currentPassword"
                                            value={formik.values?.currentPassword || ''}
                                            onBlur={formik.handleBlur}
                                            handleChange={formik.handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                            placeholder={`${intl.formatMessage({ id: 'currentPassword' })}`}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputField
                                            size="small"
                                            fullWidth
                                            label={<FormattedMessage id="newPassword" />}
                                            id="newPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            name="newPassword"
                                            value={formik.values?.newPassword || ''}
                                            onBlur={formik.handleBlur}
                                            handleChange={formik.handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                                            placeholder={`${intl.formatMessage({ id: 'newPassword' })}`}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <InputField
                                            size="small"
                                            fullWidth
                                            label={<FormattedMessage id="reNewPassword" />}
                                            id="reNewPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            name="reNewPassword"
                                            value={formik.values?.reNewPassword || ''}
                                            onBlur={formik.handleBlur}
                                            handleChange={formik.handleChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={formik.touched.reNewPassword && Boolean(formik.errors.reNewPassword)}
                                            helperText={formik.touched.reNewPassword && formik.errors.reNewPassword}
                                            placeholder={`${intl.formatMessage({ id: 'reNewPassword' })}`}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row">
                                            <AnimateButton>
                                                <Button type="submit" variant="contained">
                                                    Change Password
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={6} md={4}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard title="Delete Account">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        To deactivate your account, first delete its resources. If you are the only owner of any teams,
                                        either assign another owner or deactivate the team.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row">
                                        <AnimateButton>
                                            <Button
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    borderColor: theme.palette.error.main,
                                                    '&:hover': {
                                                        background: theme.palette.error.light + 25,
                                                        borderColor: theme.palette.error.main
                                                    }
                                                }}
                                                variant="outlined"
                                                size="small"
                                            >
                                                Deactivate Account
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Security;
