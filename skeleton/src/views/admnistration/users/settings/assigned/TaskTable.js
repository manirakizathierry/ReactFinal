import { Checkbox, Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyledTableCell, StyledTableRow } from 'utils/tools';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const rangeData = (task, menus, setMenusTask) => {
    const tasksss = task.tasks;
    const menusss = [];
    menus.forEach((mn) => {
        let mnu = {
            id: mn.id,
            id_fonction: task.id_fonction ? task.id_fonction : '',
            droit: mn.id ? mn.id : '',
            description_droit: mn.designation ? mn.designation : '',
            creer: false,
            modifier: false,
            supprimer: false,
            consulter: false,
            visualiser: false,
            traiter: false,
            date_debut: null,
            date_fin: null
        };
        tasksss.forEach((ts) => {
            if (ts.droit === mn.id) {
                mnu = { id: mn.id, ...ts, description_droit: mn.designation };
            }
        });
        menusss.push(mnu);
    });
    console.log('new ', menusss);
    setMenusTask(menusss);
};

const TaskTable = ({ task, setTask, setError }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const [menusTask, setMenusTask] = useState([]);
    const menus = useSelector((state) => state.menusPrincipal.menus);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const assignedAcces = (row, type = '') => {
        if (task.id_fonction === '') {
            setError({ id_fonction: 'error' });
        } else {
            const copyArr = menusTask.slice();
            switch (type) {
                case 'menu':
                    copyArr.forEach((r) => {
                        if (r.id === row.id) {
                            r.consulter = r.consulter !== true;
                            r.creer = r.consulter === false ? false : r.creer;
                            r.modifier = r.consulter === false ? false : r.modifier;
                            r.supprimer = r.consulter === false ? false : r.supprimer;
                            r.visualiser = r.consulter === false ? false : r.visualiser;
                        }
                    });
                    break;
                case 'read':
                    copyArr.forEach((r) => {
                        if (r.id === row.id) {
                            r.visualiser = r.visualiser !== true;
                            r.consulter = r.consulter === true ? r.consulter : true;
                        }
                    });
                    break;
                case 'create':
                    copyArr.forEach((r) => {
                        if (r.id === row.id) {
                            r.creer = r.creer !== true;
                            r.consulter = r.consulter === true ? r.consulter : true;
                        }
                    });
                    break;
                case 'modify':
                    copyArr.forEach((r) => {
                        if (r.id === row.id) {
                            r.modifier = r.modifier !== true;
                            r.consulter = r.consulter === true ? r.consulter : true;
                        }
                    });
                    break;
                case 'valider':
                    copyArr.forEach((r) => {
                        if (r.id === row.id) {
                            r.traiter = r.traiter !== true;
                            r.consulter = r.consulter === true ? r.consulter : true;
                        }
                    });
                    break;
                case 'delete':
                    copyArr.forEach((r) => {
                        if (r.id === row.id) {
                            r.supprimer = r.supprimer !== true;
                            r.consulter = r.consulter === true ? r.consulter : true;
                        }
                    });
                    break;
                default:
                    break;
            }
            setMenusTask((prev) => {
                prev = copyArr;
                return prev;
            });
            setTask({ ...task, tasks: copyArr });
            setError({ id_fonction: '' });
        }
    };

    useEffect(() => {
        rangeData(task, menus, setMenusTask);
    }, [task.id_fonction]);
    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell width={50}>
                                <FormattedMessage id="numero" />
                            </StyledTableCell>
                            <StyledTableCell width={150}>
                                <FormattedMessage id="entitled" />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                                <FormattedMessage id="create" />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                                <FormattedMessage id="edit" />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                                <FormattedMessage id="read" />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                                <FormattedMessage id="delete" />
                            </StyledTableCell>
                            <StyledTableCell width={100}>
                                <FormattedMessage id="valider" />
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {menusTask.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r, indx) => (
                            <StyledTableRow hover key={indx} sx={{ margin: -1 }}>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    {indx + 1}
                                </StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    <FormattedMessage id={r.description_droit} />
                                </StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    <Checkbox
                                        size="small"
                                        {...label}
                                        checked={r.creer ? r.creer : false}
                                        onChange={() => assignedAcces(r, 'create')}
                                    />
                                </StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    <Checkbox
                                        {...label}
                                        checked={r.modifier ? r.modifier : false}
                                        onChange={() => assignedAcces(r, 'modify')}
                                        size="small"
                                    />
                                </StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    <Checkbox
                                        {...label}
                                        size="small"
                                        checked={r.visualiser ? r.visualiser : false}
                                        onChange={() => assignedAcces(r, 'read')}
                                    />
                                </StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    <Checkbox
                                        size="small"
                                        {...label}
                                        checked={r.traiter ? r.traiter : false}
                                        onChange={() => assignedAcces(r, 'valider')}
                                    />
                                </StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} component="th" scope="row">
                                    <Checkbox
                                        {...label}
                                        size="small"
                                        checked={r.supprimer ? r.supprimer : false}
                                        onChange={() => assignedAcces(r, 'delete')}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={menusTask.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

TaskTable.propTypes = {
    task: PropTypes.object.isRequired,
    setTask: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default TaskTable;
