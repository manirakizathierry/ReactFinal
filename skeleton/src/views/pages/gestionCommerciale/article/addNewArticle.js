import { useTheme } from "@emotion/react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, Stack } from "@mui/material";
import { articleAPI } from "api";
import { articleApi } from "api/gestionCommerciale/article/articleApi";
import { axeApi } from "api/pip/axe/axeApi";
import { titleBudgetApi } from "api/pip/titleBudget/titleBudgetApi";
import { getIn, useFormik } from "formik";
import * as yup from 'yup';
import moment from "moment";
import { useEffect,useState,forwardRef } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "store/actions";
import { Close, RotateLeftRounded, Save } from "@mui/icons-material";
import AutocompleteComponent from "ui-component/AutocompleteComponent";
import InputField from "ui-component/InputField";
import DatePickerComponent from "ui-component/DatePickerComponent";
import ButtonComponent from "ui-component/ButtonComponent";
import { SpinnerLoader } from "views/ui-elements/Loaders";

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

const validationSchema = yup.object({
    axeStrategique: yup
        .object()
        .nullable()
        .required(<FormattedMessage id="required-field" />),
    titleBudgetaire: yup
        .object()
        .nullable()
        .required(<FormattedMessage id="required-field" />),
    code: yup
        .string()
        .min(2, ({ min }) => `code must be at least ${min} characters`)
        .max(9, ({ max }) => `code must be at least ${max} characters`)
        .required('code is required')
        .typeError('invalid format'),
    libelle: yup.string().required(<FormattedMessage id="required-field" />),
    startDate: yup
        .date()
        .nullable(true)
        // .max(new Date(), <FormattedMessage id="start-dat-max" />)
        .typeError(<FormattedMessage id="required-field" />)
        .required(<FormattedMessage id="required-field" />),
    endDate: yup
        .date()
        .nullable(true)
        .min(yup.ref('startDate'), <FormattedMessage id="required-date-infos" />)
        // .max(new Date(), <FormattedMessage id="required-date-max" />)
        .typeError(<FormattedMessage id="required-date-value" />)
});

export default function AddNewArticle(open,handleSubmit,articleToEdit,closeModal,snackAlert){
    const [loading, setLoading] = useState(false);
    const [arrayAxisStratagical, setArrayAxisStratagical] = useState([]);
    const [arrayBudgetTitle, setArrayBudgetTitle] = useState([]);

    const dispatch = useDispatch();
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            axeStrategique: articleToEdit.axeStrategique,
            titleBudgetaire: articleToEdit.titleBudgetaire,
            code: articleToEdit.code,
            libelle: articleToEdit.libelle,
            startDate: articleToEdit.startDate ? new Date(articleToEdit.startDate.split('/').reverse().join('-')).toString() : null,
            endDate: articleToEdit.endDate ? new Date(articleToEdit.endDate.split('/').reverse().join('-')).toString() : null
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (data, { resetForm }) => {
            console.log('objectiveToEdit=======>>', articleToEdit);
            console.log('data=======>>', data);
            setLoading(true);
            if (articleToEdit.id) {
                const objectiveUpdateServer = {
                    code: data.code,
                    libelle: data.libelle,
                    dateDebutS: moment(data.startDate).format('DD/MM/YYYY'),
                    dateFinS: data.endDate ? moment(data.endDate).format('DD/MM/YYYY') : '',
                    axeStrategiqueDto: {
                        id: data.axeStrategique.id
                    },
                    titreBudgetaireDto: {
                        id: data.titleBudgetaire.id
                    }
                };
                // objectiveUpdateServer

                articleApi
                    .updateArticle(objectiveUpdateServer, articleToEdit.id)
                    .then((res) => {
                        console.log('res===>>', res);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: res.message,
                            variant: 'alert',
                            alertSeverity: 'success',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            close: true
                        });
                        handleSubmit(objectiveUpdateServer);
                        setLoading(false);
                        resetForm();
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
                const articleAddServer = {
                    code: data.code,
                    libelle: data.libelle,
                    dateDebutS: moment(data.startDate).format('DD/MM/YYYY'),
                    dateFinS: data.endDate ? moment(data.endDate).format('DD/MM/YYYY') : '',
                    axeStrategiqueDto: {
                        id: data.axeStrategique.id
                    },
                    titreBudgetaireDto: {
                        id: data.titleBudgetaire.id
                    }
                };
                console.log('objectiveAddServer=======>>', articleAddServer);
                articleAPI
                    .addArticle(articleAddServer)
                    .then((res) => {
                        console.log('res===>>', res);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: res.message,
                            variant: 'alert',
                            alertSeverity: 'success',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                            close: true
                        });
                        handleSubmit(articleAddServer);
                        setLoading(false);
                        resetForm();
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

    const handleChangeData = (event, newValue) => {
        formik.setFieldValue('axeStrategique', newValue);
    };
    const handleChangeDataTitle = (event, newValue) => {
        formik.setFieldValue('titleBudgetaire', newValue);
    };

    const onGetAllAxisStrategical = () => {
        axeApi
            .getAllAxeStrategique()
            .then((res) => {
                console.log('res===>>', res);
                setArrayAxisStratagical(res.data.contents);
            })
            .catch((error) => {
                console.log('error===>>', error);
            });
    };

    const onGetAllTitleBudegtay = () => {
        titleBudgetApi
            .getAllTitleBudget()
            .then((res) => {
                console.log('res===> title budget', res);
                setArrayBudgetTitle(res.data);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    useEffect(() => {
        onGetAllAxisStrategical();
        onGetAllTitleBudegtay();
    }, []);
    return (
        <>
            <Dialog open={open} TransitionComponent={Transition} keepMounted maxWidth="md" fullWidth>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mr: 2 }}>
                        <DialogTitle id="alert-dialog-slide-title1" sx={{ color: theme.palette.primary.main }}>
                            {articleToEdit.id ? <FormattedMessage id="edit-objective" /> : <FormattedMessage id="add-objctive" />}
                        </DialogTitle>
                        <IconButton
                            onClick={() => {
                                closeModal();
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
                        <Stack>
                            <AutocompleteComponent
                                name="axeStrategique"
                                label={<FormattedMessage id="select-axis-strategical" />}
                                value={formik.values.axeStrategique}
                                handleChange={handleChangeData}
                                error={getIn(formik.touched, 'axeStrategique') && getIn(formik.errors, 'axeStrategique')}
                                helperText={getIn(formik.touched, 'axeStrategique') && getIn(formik.errors, 'axeStrategique')}
                                options={arrayAxisStratagical?.map((axe) => ({
                                    label: `${axe.code}|| ${axe.libelle}`,
                                    id: axe.id
                                }))}
                            />
                            <AutocompleteComponent
                                name="groupe"
                                label={<FormattedMessage id="budget-title" />}
                                value={formik.values.titleBudgetaire}
                                handleChange={handleChangeDataTitle}
                                error={getIn(formik.touched, 'titleBudgetaire') && getIn(formik.errors, 'titleBudgetaire')}
                                helperText={getIn(formik.touched, 'titleBudgetaire') && getIn(formik.errors, 'titleBudgetaire')}
                                options={arrayBudgetTitle?.map((title) => ({
                                    label: `${title.code}|| ${title.libelle}`,
                                    id: title.id
                                }))}
                            />
                            <InputField
                                label={<FormattedMessage id="code" />}
                                name="code"
                                value={formik.values.code}
                                handleChange={formik.handleChange}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
                                inputProps={{ maxLength: 5 }}
                            />
                            <InputField
                                label={<FormattedMessage id="libelle" />}
                                name="libelle"
                                value={formik.values.libelle}
                                handleChange={formik.handleChange}
                                error={formik.touched.libelle && Boolean(formik.errors.libelle)}
                                helperText={formik.touched.libelle && formik.errors.libelle}
                            />
                            <DatePickerComponent
                                label={<FormattedMessage id="start-dat" />}
                                name="startDate"
                                disableFuture
                                horizontal={false}
                                value={formik.values.startDate}
                                handleChange={(newValue) => {
                                    formik.setFieldValue('startDate', newValue);
                                }}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                            />
                            <DatePickerComponent
                                label={<FormattedMessage id="end-date" />}
                                name="endDate"
                                horizontal={false}
                                value={formik.values.endDate}
                                handleChange={(newValue) => formik.setFieldValue('endDate', newValue)}
                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                helperText={formik.touched.endDate && formik.errors.endDate}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ mr: 2 }}>
                        <ButtonComponent
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<RotateLeftRounded />}
                            text={<FormattedMessage id="reset" />}
                            disabled={loading || !formik.dirty}
                            handleClick={() => formik.resetForm()}
                        />
                        <ButtonComponent
                            variant="contained"
                            type="submit"
                            size="small"
                            text={articleToEdit?.id ? <FormattedMessage id="update" /> : <FormattedMessage id="save" />}
                            disabled={loading || !formik.dirty}
                            startIcon={loading ? <CircularProgress size="16px" /> : <Save />}
                        />
                    </DialogActions>
                </form>
            </Dialog>
            <SpinnerLoader open={loading} />
        </>
    );
}