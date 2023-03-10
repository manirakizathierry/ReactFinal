// material-ui
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    tableCellClasses,
    Typography,
    IconButton,
    Tooltip,
    Stack,
    Pagination,
    TableSortLabel
} from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { FormattedMessage, useIntl } from 'react-intl';
import TotalGrowthBarChart from './cards/Skeleton/TotalGrowthBarChart';
import { Delete, Edit } from '@mui/icons-material';
import TypographyListDescription from './TypographyListDescription';
import SelectComponent from './SelectComponent';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

// styles

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        fontSize: 14,
        fontWeight: 'bold',
        border: '0.5px solid #ccc'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '0.1px solid #fff'
    },

    [`&.${tableCellClasses.footer}`]: {
        fontSize: 16,
        fontWeight: '700',
        border: '0.5px solid #ccc'
    }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover
    }
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0
    // }
}));
// functions
const Actions = ({ row, deleteFunction, editFunction, deletable, editable }) => {
    const theme = useTheme();
    return (
        <>
            <StyledTableCell width="8%">
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} margin={-1}>
                    {deletable && (
                        <Tooltip title={<FormattedMessage id="delete" />} arrow placement="left">
                            <IconButton
                                component="span"
                                style={{
                                    padding: 4,
                                    margin: 0
                                }}
                                size="small"
                                onClick={() => {
                                    deleteFunction(row);
                                }}
                                sx={{
                                    ':hover': {
                                        color: theme.palette.error.main
                                    }
                                }}
                            >
                                <Delete fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {editable && (
                        <Tooltip title={<FormattedMessage id="edit" />} arrow placement="right">
                            <IconButton
                                component="span"
                                style={{
                                    padding: 4,
                                    margin: 0
                                }}
                                size="small"
                                onClick={() => {
                                    editFunction(row);
                                }}
                                sx={{
                                    ':hover': {
                                        color: theme.palette.primary.dark
                                    }
                                }}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </StyledTableCell>
        </>
    );
};

function TablesCustomizedComponent({
    sx,
    page,
    sort,
    rows,
    black,
    props,
    numero,
    headers,
    theader,
    actions,
    loading,
    rowClick,
    paginate,
    editable,
    deletable,
    handleSort,
    editFunction,
    staticLenght,
    deleteFunction,
    setTableToExport,
    handleChangeRowsPerPage,
    ...tableProps
}) {
    const theme = useTheme();
    const intl = useIntl();
    if (setTableToExport) setTableToExport('tableToExport');
    const isActions = actions ? 1 : 0;
    const lenghtForColsPan = headers ? headers.length + isActions : staticLenght + isActions;

    return (
        <>
            <MainCard content={false}>
                {loading ? (
                    <TotalGrowthBarChart />
                ) : (
                    <TableContainer sx={{ ...sx }}>
                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 280px)' }}>
                            <Table size="small" id="tableToExport" sx={{ minWidth: 320 }} aria-label="customized table" {...tableProps}>
                                {headers ? (
                                    <TableHead>
                                        <TableRow>
                                            {headers?.map((item, index) => {
                                                const hd = item.toString().split('#');
                                                return (
                                                    <StyledTableCell key={`${index}${hd?.[0]}`} align={hd?.[1]} width={hd?.[2]}>
                                                        {sort && sort.includes(index) ? (
                                                            <TableSortLabel
                                                                active
                                                                direction={page?.sort}
                                                                onClick={handleSort}
                                                                sx={{
                                                                    '&.MuiTableSortLabel-root': {
                                                                        color: 'white'
                                                                    },
                                                                    '&.MuiTableSortLabel-root:hover': {
                                                                        color: theme.palette.secondary[200]
                                                                    },
                                                                    '&.Mui-active': {
                                                                        color: 'white'
                                                                    },
                                                                    '& .MuiTableSortLabel-icon': {
                                                                        color: '#C7D6DA !important'
                                                                    }
                                                                }}
                                                            >
                                                                {hd?.[0]}
                                                            </TableSortLabel>
                                                        ) : (
                                                            hd?.[0]
                                                        )}
                                                    </StyledTableCell>
                                                );
                                            })}
                                            {actions && (
                                                <StyledTableCell key="actions" align="center">
                                                    <FormattedMessage id="action" />
                                                </StyledTableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                ) : (
                                    theader
                                )}
                                {rows && (
                                    <TableBody>
                                        {rows.length !== 0 ? (
                                            rows?.map((row, index) => (
                                                <StyledTableRow
                                                    // hover
                                                    sx={{
                                                        '&:nth-of-type(even)': {
                                                            backgroundColor: !black ? theme.palette.action.hover : ''
                                                        },
                                                        ':hover td': {
                                                            // backgroundColor: black?.includes(index) ? '' : theme.palette.table.hover,
                                                            backgroundColor: black?.includes(index) ? '' : theme.palette.action.hover,
                                                            color: black?.includes(index) ? '' : 'black'
                                                        }
                                                    }}
                                                    key={index}
                                                    onClick={() => {
                                                        if (rowClick) rowClick(row);
                                                    }}
                                                    {...props}
                                                >
                                                    {Object.keys(row).map((key, ind) => {
                                                        const isReactElement = String(row[key]?.$$typeof).includes('Symbol(react.element)');
                                                        const Temp = row[key]?.toString().split('#');
                                                        const position = Object.keys(row).length - 1 === ind ? 'right' : 'left';
                                                        if (isReactElement) {
                                                            return (
                                                                <StyledTableCell key={`${ind}${key}`} style={{ margin: 0 }} align="center">
                                                                    {row[key]}
                                                                </StyledTableCell>
                                                            );
                                                        }
                                                        return numero && ind === 0 ? (
                                                            <StyledTableCell key={ind} align={ind === 0 ? 'left' : position}>
                                                                {index + 1}
                                                            </StyledTableCell>
                                                        ) : (
                                                            ind !== 0 && (
                                                                <StyledTableCell
                                                                    key={ind}
                                                                    align={Temp?.[1]}
                                                                    sx={{
                                                                        color: black?.includes(index) ? 'black' : '',
                                                                        fontWeight: black?.includes(index) ? 'bolder' : '',
                                                                        backgroundColor: black?.includes(index)
                                                                            ? theme.palette.table.subHeader
                                                                            : ''
                                                                    }}
                                                                    colSpan={Temp?.[2] ? Temp?.[2] : 1}
                                                                    style={{ whiteSpace: Temp?.[3] ? Temp?.[3] : 'normal' }}
                                                                >
                                                                    {typeof Temp?.[0] === 'object' ? 'function' : Temp?.[0]}
                                                                </StyledTableCell>
                                                            )
                                                        );
                                                    })}
                                                    {actions && (
                                                        <Actions
                                                            row={row}
                                                            editFunction={editFunction}
                                                            deleteFunction={deleteFunction}
                                                            deletable={deletable}
                                                            editable={editable}
                                                        />
                                                    )}
                                                </StyledTableRow>
                                            ))
                                        ) : (
                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" colSpan={lenghtForColsPan}>
                                                    <Typography textAlign="center" variant="subtitle1" color="inherit">
                                                        <FormattedMessage id="no-data" />
                                                    </Typography>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                )}
                            </Table>
                        </PerfectScrollbar>
                    </TableContainer>
                )}
            </MainCard>
            {page && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        backgroundColor: theme.palette.grey[200],
                        borderWidth: '1px',
                        borderColor: theme.palette.grey[300],
                        borderStyle: 'solid',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: -1,
                            alignItems: 'center',
                            gap: 4
                        }}
                    >
                        <TypographyListDescription text={<FormattedMessage id="display" />} />
                        <SelectComponent
                            options={[
                                { label: `${intl.formatMessage({ id: 'all' })}`, value: 0 },
                                { label: 10, value: 10 },
                                { label: 20, value: 20 },
                                { label: 25, value: 25 },
                                { label: 50, value: 50 }
                            ]}
                            style={{ width: page.size === 0 ? 78 : 70 }}
                            defaultValue={10}
                            handleChange={handleChangeRowsPerPage}
                            value={page.size}
                        />
                        <TypographyListDescription text={<FormattedMessage id="records" />} />
                    </div>
                    <Pagination count={page.length} color="primary" size="small" onChange={paginate} shape="rounded" page={page.page + 1} />
                    <TypographyListDescription
                        text={`${rows?.length === 0 ? 0 : page.size * page.page + 1} - ${
                            page.size * page.page + rows?.length
                        } ${intl.formatMessage({ id: 'of' })} ${page.totalItems} ${intl.formatMessage({
                            id: 'records'
                        })}`}
                    />
                </div>
            )}
        </>
    );
}
export default TablesCustomizedComponent;

TablesCustomizedComponent.propTypes = {
    sx: PropTypes.any,
    props: PropTypes.any,
    theader: PropTypes.any,
    sort: PropTypes.array,
    rows: PropTypes.array,
    black: PropTypes.array,
    page: PropTypes.object,
    numero: PropTypes.bool,
    loading: PropTypes.bool,
    actions: PropTypes.bool,
    headers: PropTypes.array,
    rowClick: PropTypes.func,
    paginate: PropTypes.func,
    editable: PropTypes.bool,
    deletable: PropTypes.bool,
    handleSort: PropTypes.func,
    editFunction: PropTypes.func,
    staticLenght: PropTypes.number,
    deleteFunction: PropTypes.func,
    setTableToExport: PropTypes.func,
    handleChangeRowsPerPage: PropTypes.func
};

TablesCustomizedComponent.defaultProps = { deletable: true, editable: true, actions: false, loading: false, numero: false };

Actions.propTypes = {
    row: PropTypes.object,
    editable: PropTypes.bool,
    deletable: PropTypes.bool,
    editFunction: PropTypes.func,
    deleteFunction: PropTypes.func
};

Actions.defaultProps = {};
