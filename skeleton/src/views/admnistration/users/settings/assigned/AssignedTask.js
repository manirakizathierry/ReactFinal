import { Cached, Save } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Grid, InputLabel, MenuItem, TextField, Typography } from '@mui/material';
import { UserManager } from 'api/life/userManager/UserManager';
import { insertUserArch } from 'api/userAPI';
import moment from 'moment';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SNACKBAR_OPEN } from 'store/actions';
import { addTache } from 'store/userManagement/actionAgeDepSerFxTach/action';
import TaskTable from './TaskTable';

const filterFx = (array = [], idFonction) => {
    const newArr = array.filter((data) => parseInt(data.id_fonction, 10) !== idFonction);
    return newArr;
};

const AssignedTask = () => {
    // const menuTask = window.localStorage.getItem('tasksss');
    const menuTask = JSON.parse(window.localStorage.getItem('menusss'));
    const idFromTask = menuTask.advance.id_fonction;
    console.log('id_fonction===>>>', menuTask.advance.id_fonction);

    const fonctionsArray = useSelector((state) => state.agDepServTach.fonction);
    const tachess = useSelector((state) => state.agDepServTach.tache);
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [task, setTask] = useState({ id_fonction: '', designation: '', tasks: [], newTask: [] });
    const [error, setError] = useState({ id_fonction: '' });
    const onChange = (e) => {
        console.log('e.target.value=====>>>>', e.target.value);
        const val = e.target.value.split('_');
        const newArr = tachess
            .filter((ts) => {
                let newRes = false;
                if (ts.id_fonction) {
                    newRes = ts.id_fonction === parseInt(val[0], 10);
                }
                return newRes;
            })
            .map((newR) => newR);
        setTask({ ...task, id_fonction: val[0], designation: val[1], tasks: newArr });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const idFonctionParse = parseInt(task.id_fonction, 10);
        // console.log(task.tasks);
        const insertArr = task.tasks.slice().map((ts) => ({
            id_fonction: idFonctionParse,
            droit: ts.droit,
            description_droit: ts.description_droit,
            creer: ts.creer,
            modifier: ts.modifier,
            supprimer: ts.supprimer,
            consulter: ts.consulter,
            visualiser: ts.visualiser,
            traiter: ts.traiter
            // date_debut: `${moment().format('YYYY-MM-DD')}T00:00:00`,
            // date_fin: null
        }));

        UserManager.addTacheApi({ id_fonction: idFonctionParse, tache: insertArr })
            .then((res) => {
                const newArr = filterFx(tachess.slice(), idFonctionParse);
                const arr = [...newArr, ...res.result];
                console.log('res.result=========>>>>>.', res.result);

                dispatch(addTache(arr));
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: res.message,
                    variant: 'alert',
                    alertSeverity: 'success',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
                setTask({ id_fonction: '', designation: '', tasks: [], newTask: [] });
                res.result.forEach((tache) => {
                    if (tache.id_fonction === idFromTask) {
                        navigator('login', { replace: true });
                    }
                });
            })
            .catch((error) => {
                console.log('error====>>>>', error.message);
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: `${error.response?.data.message ? error.response.data.message : error.message}`,
                    variant: 'alert',
                    alertSeverity: 'error',
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    close: true
                });
            });
    };
    return (
        <Card elevation={2}>
            <CardContent>
                <form onSubmit={handleSubmit} id="assignTask">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Grid item xs={6}>
                                    <InputLabel>
                                        <Typography variant="subtitle1" color="black">
                                            <FormattedMessage id="function" />
                                        </Typography>
                                    </InputLabel>
                                    <TextField
                                        select
                                        size="small"
                                        name="fonction"
                                        value={`${task.id_fonction}_${task.designation}`}
                                        fullWidth
                                        onChange={onChange}
                                        error={error.id_fonction !== ''}
                                    >
                                        {fonctionsArray.map((fun, ind) => (
                                            <MenuItem key={ind} value={`${fun?.id_fonction}_${fun?.designation}`}>
                                                {fun?.designation.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', columnGap: 1, marginTop: -5 }}>
                                        <Button fullWidth size="medium" type="submit" variant="contained" startIcon={<Save />}>
                                            <FormattedMessage id="save" />
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="action"
                                            size="medium"
                                            fullWidth
                                            startIcon={<Cached />}
                                            onClick={() => {
                                                setTask({ tasks: [], id_fonction: '' });
                                            }}
                                        >
                                            <FormattedMessage id="reset" />
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TaskTable task={task} setTask={setTask} setError={setError} />
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default AssignedTask;
