import { Cached, Save } from '@mui/icons-material';
import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

const FormCellules = ({ rowSelected, setRowSelected }) => {
    const dispatch = useDispatch();
    const { departments, services } = useSelector((state) => state.userSettings);
    const [service, setService] = useState({ entitled: '', idDepartment: '' });
    const [error, setError] = useState({ entitled: '', idDepartment: '' });
    const onChange = (e) => {
        if (e.target.name === 'entitled') {
            setService({ ...service, entitled: e.target.value });
        } else {
            setService({ ...service, idDepartment: e.target.value });
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const servicess = services.slice();
        if (rowSelected.entitled) {
            servicess.forEach((dp) => {
                if (dp.id === rowSelected.id) {
                    dp.entitled = service.entitled;
                    dp.idDepartment = service.idDepartment;
                }
            });
            dispatch({ type: 'USER@SERVICES', servicesList: servicess });
            setRowSelected({});
        } else {
            const idDep = services.length === 0 ? services.length + 1 : services[services.length - 1].id + 1;
            servicess.push({ id: idDep, entitled: service.entitled, idDepartment: service.idDepartment });
            dispatch({ type: 'USER@SERVICES', servicesList: servicess });
        }
        setService({ entitled: '', idDepartment: '' });
    };
    useEffect(() => {
        console.log(rowSelected);
        setService(
            rowSelected.entitled
                ? { entitled: rowSelected.entitled, idDepartment: rowSelected.idDepartment }
                : { entitled: '', idDepartment: '' }
        );
    }, [rowSelected]);
    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={4} sx={{ height: 80 }}>
                    <InputLabel>
                        <Typography variant="subtitle1" color="black">
                            <FormattedMessage id="select-department" />
                        </Typography>
                    </InputLabel>
                    <TextField
                        select
                        size="small"
                        name="department"
                        value={service.idDepartment}
                        fullWidth
                        onChange={onChange}
                        error={error.idDepartment !== ''}
                        helperText={error.idDepartment !== '' && error.idDepartment}
                    >
                        {departments.map((dp, ind) => (
                            <MenuItem key={ind} value={dp.id}>
                                {dp.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={4} sx={{ height: 80 }}>
                    <InputLabel>
                        <Typography variant="subtitle1" color="black">
                            <FormattedMessage id="entitled" />
                        </Typography>
                    </InputLabel>
                    <TextField
                        value={service.entitled}
                        fullWidth
                        size="small"
                        name="entitled"
                        onChange={onChange}
                        error={error.entitled !== ''}
                        helperText={error.entitled !== '' && error.entitled}
                    />
                </Grid>
                <Grid item xs={4} sx={{ height: 80 }}>
                    <Box sx={{ display: 'flex', gap: 1, marginTop: 3.5 }}>
                        <Button size="small" type="submit" variant="contained" startIcon={<Save />} sx={{}}>
                            {rowSelected.entitled ? <FormattedMessage id="edit" /> : <FormattedMessage id="save" />}
                        </Button>
                        <Button
                            variant="contained"
                            color="action"
                            size="small"
                            startIcon={<Cached />}
                            onClick={() => {
                                setRowSelected({});
                                setService({ entitled: '', idDepartment: '' });
                            }}
                        >
                            <FormattedMessage id="reset" />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default FormCellules;
