import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Grid, TextField, Typography } from '@mui/material';

import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import * as locale from 'date-fns/locale';

const DatePickerComponent = ({
    label,
    value,
    handleChange,
    labelStyles,
    style,
    disabled,
    horizontal,
    error,
    inputStyle,
    helperText,
    gridProps,
    ...props
}) => {
    const intl = useIntl();
    return (
        <Grid
            item
            justifyContent="start"
            alignItems={horizontal ? 'center' : 'start'}
            direction={horizontal ? 'row' : 'column'}
            style={{ ...style }}
            {...gridProps}
        >
            <Typography
                htmlFor="input"
                style={{
                    marginRight: 5,
                    color: 'black',
                    ...labelStyles
                }}
            >
                {label}
            </Typography>
            <LocalizationProvider locale={intl.locale === 'fr' ? locale.fr : locale.enUS} dateAdapter={AdapterDateFns}>
                <DatePicker
                    renderInput={(props) => (
                        <TextField fullWidth {...props} error={error} style={{ ...inputStyle }} helperText={helperText} size="small" />
                    )}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    {...props}
                />
            </LocalizationProvider>
        </Grid>
    );
};
DatePickerComponent.propTypes = {
    handleChange: PropTypes.func.isRequired,
    horizontal: PropTypes.bool
};
DatePickerComponent.defaultProps = { horizontal: false };

export default DatePickerComponent;
