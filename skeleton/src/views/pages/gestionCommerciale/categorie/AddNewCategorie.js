import { forwardRef, useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// material-ui
import Stack from '@mui/material/Stack';
import ButtonComponent from 'ui-component/ButtonComponent';

// material-ui
import { DialogActions, DialogContent, DialogTitle, CircularProgress, Dialog, IconButton, Slide } from '@mui/material';
import InputField from 'ui-component/InputField';
import JWTContext from 'contexts/JWTContext';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
// import * as projetAPI from 'api/projetAPI';
import Close from '@mui/icons-material/Close';
import { FormattedMessage } from 'react-intl';
import { SpinnerLoader } from 'views/ui-elements/Loaders';
import { RotateLeftRounded, Save } from '@mui/icons-material';
import { SNACKBAR_OPEN } from 'store/actions';
import { useDispatch } from 'react-redux';
import DatePickerComponent from 'ui-component/DatePickerComponent';
import * as moment from 'moment';
import { categorieApi } from 'api/gestionCommerciale/categorie/categorieApi';
// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const validationSchema = yup.object({
    code: yup
        .string()
        .min(2, ({ min }) => `${(<FormattedMessage id="code-must" />)} ${min} characters`)
        .max(2, ({ max }) => `${(<FormattedMessage id="code-must" />)}${max} characters`)
        .required(<FormattedMessage id="required-field" />)
        .typeError(<FormattedMessage id="invalid-field" />),
    libelle: yup.string().required(<FormattedMessage id="required-field" />),
    dateDebut: yup
        .date()
        .nullable(true)
        // .max(new Date(), <FormattedMessage id="start-dat-max" />)
        .typeError(<FormattedMessage id="required-field" />)
        .required(<FormattedMessage id="required-field" />),
    dateFin: yup
        .date()
        .nullable(true)
        .min(yup.ref('startDate'), <FormattedMessage id="required-date-infos" />)
        // .max(new Date(), <FormattedMessage id="required-date-max" />)
        .typeError(<FormattedMessage id="required-date-value" />)
});

export default function AddNewCategorie({open, handleSubmit, categorieToEdit, closeModal, snackAlert})
{
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            code: categorieToEdit.code,
            libelle: categorieToEdit.libelle,
            dateDebut: categorieToEdit.dateDebut ? new Date(categorieToEdit.dateDebut.split('/').reverse().join('-')).toString() : null,
            dateFin: categorieToEdit.dateFin ? new Date(categorieToEdit.dateFin.split('/').reverse().join('-')).toString() : null
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (data, { resetForm }) => {
            setLoading(true);
            if (categorieToEdit.id) {
                const updateToServerCategorie = {
                    code: data.code,
                    libelle: data.libelle,
                    dateDebutS: moment(data.startDate).format('DD/MM/YYYY'),
                    dateFinS: data.endDate ? moment(data.endDate).format('DD/MM/YYYY') : null
                };
                console.log('updateToServerAxe====>>>', updateToServerCategorie);
                categorieApi
                    .updateCategorie(updateToServerCategorie, categorieToEdit.id)
                    .then((res) => {
                        handleSubmit(updateToServerCategorie);
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
                    })
                    .catch((error) => {
                        console.log(error);
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
                const addToServerCategorie = {
                    code: data.code,
                    libelle: data.libelle,
                    dateDebutS: moment(data.startDate).format('DD/MM/YYYY'),
                    dateFinS: data.endDate ? moment(data.endDate).format('DD/MM/YYYY') : null
                };
                console.log('addToServerCategorie======>>>>>', addToServerCategorie);
                categorieApi
                    .addCategorie(addToServerCategorie)
                    .then((res) => {
                        console.log('add result', res);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: res.message,
                            variant: 'alert',
                            alertSeverity: 'success',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            close: true
                        });
                        handleSubmit(addToServerCategorie);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
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
}
