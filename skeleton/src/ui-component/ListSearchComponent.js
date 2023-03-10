import { InputBase, Paper, IconButton, Stack, Divider } from '@mui/material';
// assets
import { IconSearch } from '@tabler/icons';
import Close from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import LightTooltip from './LightTooltip';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';

function ListSearchComponent({ handleChange, loading, sx, filterValue, setFilterValue, filter, style, ...props }) {
    const intl = useIntl();
    const theme = useTheme();
    const dispatch = useDispatch();

    const snackAlert = (message, state) => {
        dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message,
            variant: 'alert',
            alertSeverity: state
        });
    };

    const handleClearSearch = () => {
        setFilterValue('');
    };
    return (
        <>
            <Stack direction="row" alignItems="flex-start">
                <Paper component="form" variant="outlined" sx={{ display: 'flex', alignItems: 'center', width: '300px', ...sx }}>
                    <InputBase
                        id="input-search-list-style1"
                        size="small"
                        autoComplete="off"
                        error
                        value={filterValue}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                filter();
                            }
                        }}
                        sx={{ ml: 2, flex: 1, ...sx }}
                        style={{ ...style }}
                        placeholder={intl.formatMessage({ id: 'search' })}
                        inputProps={{ readOnly: loading, maxLength: 60, 'aria-label': 'search items' }}
                        {...props}
                    />
                    {filterValue ? (
                        <LightTooltip title={<FormattedMessage id="clear" />} placement="bottom">
                            <IconButton size="small" type="button" sx={{ p: '4px' }} aria-label="clear" onClick={() => handleClearSearch()}>
                                <Close fontSize="small" />
                            </IconButton>
                        </LightTooltip>
                    ) : null}
                    <Divider style={{ backgroundColor: theme.palette.grey[800] }} sx={{ height: 26, m: 0.5 }} orientation="vertical" />
                    <LightTooltip title={<FormattedMessage id="search" />} placement="bottom">
                        <IconButton
                            size="small"
                            color="primary"
                            sx={{ p: '4px' }}
                            aria-label="search"
                            onClick={() => (filterValue ? filter() : snackAlert(<FormattedMessage id="write-something" />, 'info'))}
                        >
                            <IconSearch size="20px" />
                        </IconButton>
                    </LightTooltip>
                </Paper>
            </Stack>
        </>
    );
}

ListSearchComponent.propTypes = {
    handleChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    sx: PropTypes.object,
    filterValue: PropTypes.string.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
    style: PropTypes.object
};

ListSearchComponent.defaultProps = {};

export default ListSearchComponent;
