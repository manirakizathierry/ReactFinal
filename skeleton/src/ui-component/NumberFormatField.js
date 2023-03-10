// Internal Imports
import { Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { useIntl } from 'react-intl';
import { decimalScale } from 'store/constant';

const NumberFormatField = ({
    label,
    handleChange,
    name,
    defaultValue,
    style,
    horizontal,
    labelStyles,
    placeholder,
    decimal,
    numeric,
    partten,
    value,
    InputProps,
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
                htmlFor={label}
                style={{
                    marginRight: 5,
                    color: 'black',
                    ...labelStyles
                }}
            >
                {label}
            </Typography>

            {numeric ? (
                <NumericFormat
                    {...props}
                    size="small"
                    name={name}
                    fullWidth
                    value={value}
                    autoComplete="off"
                    customInput={TextField}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    decimalScale={decimal}
                    onFocus={(e) => e.target.select()}
                    InputProps={{
                        inputProps: {
                            style: {
                                min: 0,
                                textAlign: 'end',
                                minWidth: 50
                            }
                        },
                        ...InputProps
                    }}
                    thousandSeparator={intl.locale === 'fr' ? ' ' : ','}
                    valueIsNumericString
                    onValueChange={handleChange}
                />
            ) : (
                <PatternFormat
                    {...props}
                    size="small"
                    name={name}
                    fullWidth
                    value={value}
                    autoComplete="off"
                    customInput={TextField}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onFocus={(e) => e.target.select()}
                    InputProps={{
                        inputProps: {
                            style: {
                                min: 0,
                                textAlign: 'end',
                                minWidth: 50
                            }
                        },
                        ...InputProps
                    }}
                    onValueChange={handleChange}
                />
            )}
        </Grid>
    );
};

NumberFormatField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.node,
    decimal: PropTypes.number,
    value: PropTypes.number,
    name: PropTypes.string.isRequired,
    label: PropTypes.node,
    defaultValue: PropTypes.number,
    horizontal: PropTypes.bool,
    style: PropTypes.any,
    labelStyles: PropTypes.any,
    InputProps: PropTypes.any,
    gridProps: PropTypes.any,
    numeric: PropTypes.bool
};

NumberFormatField.defaultProps = {
    placeholder: '0',
    decimal: decimalScale,
    horizontal: false,
    numeric: true
};

export default NumberFormatField;
