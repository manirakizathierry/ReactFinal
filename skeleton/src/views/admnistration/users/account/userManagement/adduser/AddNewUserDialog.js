import { forwardRef, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// material-ui
import Stack from '@mui/material/Stack';
import ButtonComponent from 'ui-component/ButtonComponent';

// material-ui
import {
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Dialog,
    IconButton,
    Slide,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Grid,
    Button
} from '@mui/material';
import InputField from 'ui-component/InputField';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';

// third-party
import { ErrorMessage, getIn, useFormik } from 'formik';
import * as yup from 'yup';
import Close from '@mui/icons-material/Close';
import { FormattedMessage } from 'react-intl';
import { SpinnerLoader } from 'views/ui-elements/Loaders';
import { RotateLeftRounded, Save, CloudUpload } from '@mui/icons-material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { userAPI } from 'api';
import { gridSpacing } from 'store/constant';

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

const validationSchema = yup.object({
    nom: yup.string().required(<FormattedMessage id="required-field" />),
    prenom: yup.string().required(<FormattedMessage id="required-field" />),
    telephone: yup.number().required(<FormattedMessage id="required-field" />),
    email: yup
        .string()
        .email()
        .required(<FormattedMessage id="required-field" />),
    username: yup.string().required(<FormattedMessage id="required-field" />),
    thumbnail: yup
        .mixed()
        .required(<FormattedMessage id="required-field" />)
        // .test('fileSelected', 'select a file please', (value) => value?.name === null)
        // .test('fileSize', 'File Size is too large', (value) => value?.size > 100000)
        .test('fileType', 'Unsupported File Format', (value) => value?.type.includes('image'))
});

// ================= IMPORT AXIOS ET INITIALISATION DE JSON DB =============

export default function AddNewUserDialog({ open, handleClose, userToEdit, snackAlert }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const hiddenFileInput = useRef(null);
    const [loading, setLoading] = useState(false);
    const [thumbnailError, setThumbnailError] = useState(null);
    const [thumb, setThumb] = useState(null);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = (e) => {
        setThumb(null);
        const selected = e.target.files[0];
        console.log(selected);
        if (!selected.type.includes('image')) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: <FormattedMessage id="Selected file must be an image" />,
                variant: 'alert',
                alertSeverity: 'warning',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                close: true
            });
        }
        if (selected.size > 1000000) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: <FormattedMessage id="Image file size must be less than 100kb" />,
                variant: 'alert',
                alertSeverity: 'warning'
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            nom: userToEdit.nom,
            prenom: userToEdit.prenom,
            telephone: userToEdit.telephone,
            email: userToEdit.email,
            username: userToEdit.username,
            thumbnail: userToEdit.thumbnail
        },
        enableReinitialize: true,
        validationSchema,

        onSubmit: async (values, { resetForm }) => {
            console.log('formik values', formik.values);
            setLoading(true);
            const fd = new FormData();
            fd.append('nom', values.nom);
            fd.append('prenom', values.prenom);
            fd.append('telephone', values.telephone);
            fd.append('email', values.email);
            fd.append('username', values.username);
            fd.append('thumbnail', values.thumbnail);
            console.log('this is data of form data', ...fd);

            // if (userToEdit.id) {
            //     userAPI
            //         .updateUser(fd, userToEdit.id)
            //         .then((res) => {
            //             console.log('Update response', res);
            //             resetForm();
            //             handleClose(res);
            //             setLoading(false);
            //             snackAlert(res.message, 'success');
            //         })
            //         .catch((error) => {
            //             setLoading(false);
            //             snackAlert(
            //                 `${error.response?.data.message ? error.response.data.message : error}`,
            //                 error.response?.status === 406 ? 'warning' : 'error'
            //             );
            //         });
            // } else {
            //     const addedArticle = {
            //         code: values.code,
            //         libelle: values.libelle,
            //         type: {
            //             key: values.type
            //         },
            //         chapitre: {
            //             id: values.chapter.id
            //         }
            //     };
            //     userAPI
            //         .saveUser(fd)
            //         .then((res) => {
            //             handleClose(res);
            //             resetForm();
            //             setLoading(false);
            //             snackAlert(res.message, 'success');
            //         })
            //         .catch((error) => {
            //             setLoading(false);
            //             snackAlert(
            //                 `${error.response?.data.message ? error.response.data.message : error}`,
            //                 error.response?.status === 406 ? 'warning' : 'error'
            //             );
            //         });
            // }
        }
    });
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-symbole1"
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mr: 2 }}>
                        <DialogTitle id="alert-dialog-slide-title1" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                            {userToEdit.id ? <FormattedMessage id="edit-user" /> : <FormattedMessage id="add-user" />}
                        </DialogTitle>
                        <IconButton
                            onClick={() => {
                                handleClose();
                                formik.resetForm();
                            }}
                            sx={{
                                ':hover': {
                                    cursor: 'pointer',
                                    backgroundColor: theme.palette.error.light,
                                    color: theme.palette.primary.light
                                }
                            }}
                            disabled={loading}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} xs={12}>
                            <InputField
                                name="nom"
                                label={<FormattedMessage id="nom" />}
                                value={formik.values.nom}
                                handleChange={formik.handleChange}
                                error={formik.touched.nom && Boolean(formik.errors.nom)}
                                helperText={formik.touched.nom && formik.errors.nom}
                                gridProps={{ xs: 6 }}
                            />
                            <InputField
                                label={<FormattedMessage id="prenom" />}
                                name="prenom"
                                value={formik.values.prenom}
                                handleChange={formik.handleChange}
                                error={formik.touched.prenom && Boolean(formik.errors.prenom)}
                                helperText={formik.touched.prenom && formik.errors.prenom}
                                gridProps={{ xs: 6 }}
                                // placeholder="Entrer le prenom"
                            />
                            <InputField
                                label={<FormattedMessage id="email" />}
                                name="email"
                                value={formik.values.email}
                                handleChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                gridProps={{ xs: 6 }}
                            />
                            <InputField
                                label={<FormattedMessage id="username" />}
                                name="username"
                                value={formik.values.username}
                                handleChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                gridProps={{ xs: 6 }}
                                // placeholder="Entrer username"
                            />
                            {/* <InputField
                                label={<FormattedMessage id="telnumber" />}
                                name="telephone"
                                value={formik.values.telephone}
                                handleChange={formik.handleChange}
                                error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                                helperText={formik.touched.telephone && formik.errors.telephone}`
                                gridProps={{ xs: 6 }}
                                placeholder="Entrer le numéro de télephone"
                            /> */}

                            {/* <InputField
                                label={<FormattedMessage id="updoadImage" />}
                                hidden
                                type="file"
                                name="thumbnail"
                                handleChange={(e) => {
                                    formik.setFieldValue('thumbnail', e.target.files[0]);
                                }}
                                error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
                                helperText={formik.touched.thumbnail && formik.errors.thumbnail}
                                gridProps={{ xs: 6 }}
                            /> */}
                            {/* <Grid item xs={12} md={6}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} onClick={handleClick}>
                                        <FormattedMessage id="updoad" />
                                        <input
                                            hidden
                                            accept="image/*"
                                            type="file"
                                            name="thumbnail"
                                            onChange={handleFileChange}
                                            ref={hiddenFileInput}
                                        />
                                    </Button>
                                </Stack>
                            </Grid> */}
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ mr: 2 }}>
                        <ButtonComponent
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<RotateLeftRounded />}
                            text={<FormattedMessage id="reset" />}
                            // disabled={loading || !formik.dirty}
                            handleClick={() => formik.resetForm()}
                        />
                        <ButtonComponent
                            variant="contained"
                            type="submit"
                            size="small"
                            text={formik.values.id === '' ? <FormattedMessage id="update" /> : <FormattedMessage id="save" />}
                            // disabled={loading || !formik.dirty}
                            startIcon={loading ? <CircularProgress size="16px" /> : <Save />}
                        />
                    </DialogActions>
                </form>
            </Dialog>
            {/* <SpinnerLoader open={loading} /> */}
        </>
    );
}
