import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    InputLabel,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import TypographyListDescription from 'ui-component/TypographyListDescription';
import TypographyListHeader from 'ui-component/TypographyListHeader';
import FormAgences from './FormAgences';
import ListDepartment from './ListAgences';
import { IconSearch } from '@tabler/icons';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CachedIcon from '@mui/icons-material/Cached';
import * as yup from 'yup';
import { useFormik, useFormikContext, useField } from 'formik';
import { StyledTableCell, StyledTableRow, WarningMessage } from 'utils/tools';
import { insertUserArch } from 'api/userAPI';
import { useSelector, useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';
import UIProgress from 'views/ui-elements/advance/UIProgress';
import { Edit } from '@mui/icons-material';

const validationSchema = yup.object({
    designation: yup.string().required('designation est requis  '),
    // societe: yup.string().required('societe est requis'),
    adresse: yup.string().required('adresse est requis')
});

const initialValue = {
    id: '',
    designation: '',
    // societe: '',
    adresse: ''
};
const Agences = () => {
    const theme = useTheme();
    const agences = useSelector((state) => state.userSettings.agences);

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [rowSelected, setRowSelected] = useState({});
    const [arrayLast, setarrayLast] = useState([]);
    const [agencesData, setAgencesData] = useState(initialValue);

    const onSubmitData = (data) => {
        const agencess = agences.slice();
        if (data.id === '') {
            setLoading(true);
            insertUserArch(
                'agence',
                {
                    designation: data.designation,
                    adresse: data.adresse,
                    id_societe: 8,
                    societe: 'societe test'
                    // societe: entitled.societe
                },
                'POST'
            )
                .then((res) => {
                    console.log(res);
                    if (res.success === true) {
                        dispatch({ type: 'USER@AGENCES', agencesList: agencess });
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
                        reset();
                    } else {
                        dispatch({ type: 'USER@AGENCES', agencesList: agencess });
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
                    }
                })
                .catch((err) => {
                    console.log(err);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: `${err.response?.data.message ? err.response.data.message : err.message}`,
                        variant: 'alert',
                        alertSeverity: 'error',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        close: true
                    });
                    setLoading(false);
                });
        } else {
            console.log('here modif');
        }
    };

    const formik = useFormik({
        initialValues: agencesData,
        validationSchema,
        onSubmit: (data) => onSubmitData(data)
    });
    const reset = () => {
        formik.resetForm();
    };
    return (
        // <Grid container spacing={1}>
        //     <Grid item xs={12} lg={12}>
        //         <TypographyListHeader text="Ajouter agence" />
        //     </Grid>
        //     <Grid item xs={12} lg={12} mb={-1}>
        //         <TypographyListDescription text="Agence" />
        //     </Grid>
        //     <Grid item xs={12} lg={12} justifyContent="center">
        //         <Grid item xs={12} md={12}>
        //             <SubCard>
        //                 <Grid container justifyContent="center" sx={{ mt: -1, mb: -1 }}>
        //                     <Button
        //                         sx={{ textTransform: 'none' }}
        //                         size="small"
        //                         // onClick={handleOpen}
        //                         startIcon={<IconSearch stroke={1.5} size="1rem" />}
        //                         variant="contained"
        //                     >
        //                         <FormattedMessage id=" Recherche Agences" />
        //                     </Button>
        //                 </Grid>
        //             </SubCard>
        //         </Grid>
        //     </Grid>
        //     <Grid item xs={12} sx={{ mt: 0.5 }}>
        //         {loading && <UIProgress />}
        //         <form onSubmit={formik.handleSubmit} id="form-validation-withdraw">
        //             <MainCard sx={{ mb: 1 }}>
        //                 <Grid container spacing={gridSpacing}>
        //                     <Grid item xs={12} sm={7} md={7} lg={7}>
        //                         <SubCard title="Information pour agence">
        //                             <Grid container spacing={gridSpacing}>
        //                                 <Grid item xs={12} sm={6} lg={6}>
        //                                     <InputLabel>
        //                                         <Typography variant="body" color="black">
        //                                             <FormattedMessage id="designation" />
        //                                         </Typography>
        //                                     </InputLabel>
        //                                     <TextField
        //                                         fullWidth
        //                                         size="small"
        //                                         name="designation"
        //                                         value={formik.values.designation || ''}
        //                                         onChange={formik.handleChange}
        //                                         error={formik.touched.designation && Boolean(formik.errors.designation)}
        //                                         helperText={formik.touched.designation && formik.errors.designation}
        //                                     />
        //                                 </Grid>
        //                                 {/* <Grid item xs={12} lg={4}>
        //                                     <InputLabel>
        //                                         <Typography variant="subtitle1" color="black">
        //                                             <FormattedMessage id="society" />
        //                                         </Typography>
        //                                     </InputLabel>
        //                                     <TextField
        //                                         fullWidth
        //                                         size="small"
        //                                         name="societe"
        //                                         value={formik.values.societe || ''}
        //                                         onChange={formik.handleChange}
        //                                         error={formik.touched.societe && Boolean(formik.errors.societe)}
        //                                         helperText={formik.touched.societe && formik.errors.societe}
        //                                     />
        //                                 </Grid> */}
        //                                 <Grid item xs={12} sm={6} lg={6}>
        //                                     <InputLabel>
        //                                         <Typography variant="body" color="black">
        //                                             <FormattedMessage id="address" />
        //                                         </Typography>
        //                                     </InputLabel>
        //                                     <TextField
        //                                         fullWidth
        //                                         size="small"
        //                                         name="adresse"
        //                                         value={formik.values.adresse || ''}
        //                                         onChange={formik.handleChange}
        //                                         error={formik.touched.adresse && Boolean(formik.errors.adresse)}
        //                                         helperText={formik.touched.adresse && formik.errors.adresse}
        //                                     />
        //                                 </Grid>
        //                             </Grid>
        //                         </SubCard>
        //                     </Grid>
        //                     <Grid item xs={12} sm={5} md={5} lg={5}>
        //                         <SubCard title="agences">
        //                             <Grid container spacing={2}>
        //                                 <Grid item xs={12} mt={1.5}>
        //                                     <MainCard>
        //                                         <TableContainer>
        //                                             <Table size="small">
        //                                                 <TableHead>
        //                                                     <TableRow>
        //                                                         <StyledTableCell align="center">No</StyledTableCell>
        //                                                         <StyledTableCell align="center">
        //                                                             {/* <FormattedMessage id="amount-withdraw" /> */}
        //                                                             Designation
        //                                                         </StyledTableCell>
        //                                                         <StyledTableCell align="center">
        //                                                             Adresse
        //                                                             {/* <FormattedMessage id="date-operation" /> */}
        //                                                         </StyledTableCell>
        //                                                     </TableRow>
        //                                                 </TableHead>
        //                                                 <TableBody>
        //                                                     {agences.length === 0 ? (
        //                                                         <StyledTableCell colSpan={4}>
        //                                                             <WarningMessage
        //                                                                 message={<FormattedMessage id="aucune-donnee" />}
        //                                                                 type="info"
        //                                                             />
        //                                                         </StyledTableCell>
        //                                                     ) : (
        //                                                         agences.map((row, ind) => (
        //                                                             <StyledTableRow hover key={ind}>
        //                                                                 <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
        //                                                                     {ind + 1}
        //                                                                 </StyledTableCell>
        //                                                                 <StyledTableCell>{row.designation}</StyledTableCell>
        //                                                                 <StyledTableCell>{row?.societe}</StyledTableCell>
        //                                                                 <StyledTableCell>{row.adresse}</StyledTableCell>
        //                                                                 <StyledTableCell sx={{ pr: 3 }}>
        //                                                                     <Box sx={{ display: 'flex' }}>
        //                                                                         <Button
        //                                                                             // onClick={() => {
        //                                                                             //     onEdit(row);
        //                                                                             // }}
        //                                                                             size="small"
        //                                                                             variant="container"
        //                                                                             color="info"
        //                                                                             startIcon={<Edit sx={{ fontSize: '1rem' }} />}
        //                                                                         >
        //                                                                             <FormattedMessage id="edit" />
        //                                                                         </Button>
        //                                                                     </Box>
        //                                                                 </StyledTableCell>
        //                                                             </StyledTableRow>
        //                                                         ))
        //                                                     )}
        //                                                 </TableBody>
        //                                             </Table>
        //                                         </TableContainer>
        //                                     </MainCard>
        //                                 </Grid>
        //                             </Grid>
        //                         </SubCard>
        //                     </Grid>
        //                 </Grid>
        //             </MainCard>
        //             <SubCard>
        //                 <Grid container spacing={gridSpacing} justifyContent="center">
        //                     <Grid item xs={12} lg={4}>
        //                         <Button variant="contained" startIcon={<SaveIcon />} type="submit" size="small" fullWidth>
        //                             <FormattedMessage id="save" />
        //                         </Button>
        //                     </Grid>
        //                     <Grid item xs={12} lg={4}>
        //                         <Button startIcon={<CachedIcon />} size="small" fullWidth variant="outlined" onClick={() => reset()}>
        //                             <FormattedMessage id="reset" />
        //                         </Button>
        //                     </Grid>
        //                     <Grid item xs={12} lg={4}>
        //                         <Button
        //                             startIcon={<DeleteIcon />}
        //                             size="small"
        //                             fullWidth
        //                             variant="contained"
        //                             sx={{
        //                                 background: theme.palette.warning.dark,
        //                                 '&:hover': { background: theme.palette.warning.main },
        //                                 color: 'grey.900'
        //                             }}
        //                         >
        //                             <FormattedMessage id="delete" />
        //                         </Button>
        //                     </Grid>
        //                 </Grid>
        //             </SubCard>
        //         </form>
        //     </Grid>
        // </Grid>

        <Card elevation={2} sx={{ height: 500 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            <FormattedMessage id="agency" />
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormAgences rowSelected={rowSelected} setRowSelected={setRowSelected} />
                    </Grid>
                    <Grid item xs={12}>
                        <ListDepartment setRowSelected={setRowSelected} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Agences;
