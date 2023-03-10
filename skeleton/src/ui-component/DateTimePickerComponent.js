import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/lab';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import * as locale from 'date-fns/locale';

const DateTimePickerComponent = ({ label, value, handleChange, labelStyles, style, disabled, horizontal, error, helperText, ...props }) => {
    const intl = useIntl();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: horizontal ? 'row' : 'column',
                justifyContent: 'start',
                alignItems: horizontal ? 'center' : 'start',
                marginTop: 3,
                marginBottom: 3,
                ...style
            }}
        >
            <label
                htmlFor="input"
                style={{
                    marginRight: 5,
                    fontWeight: 'normal',
                    color: 'black',
                    ...labelStyles
                }}
            >
                {label}
            </label>
            <LocalizationProvider locale={intl.locale === 'fr' ? locale.fr : locale.enUS} dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField fullWidth {...props} error={error} helperText={helperText} size="small" />}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    {...props}
                />
            </LocalizationProvider>
        </div>
    );
};
DateTimePickerComponent.propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default DateTimePickerComponent;
