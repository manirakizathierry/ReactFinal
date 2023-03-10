import { Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const InputField = ({
    label,
    handleChange,
    name,
    defaultValue,
    style,
    gridProps,
    inputSize,
    select,
    children,
    labelStyles,
    horizontal,
    value,
    ...props
}) => (
    <Grid
        item
        justifyContent="start"
        alignItems={horizontal ? 'center' : 'start'}
        direction={horizontal ? 'row' : 'column'}
        style={{ ...style }}
        {...gridProps}
    >
        {' '}
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
        {select ? (
            <TextField
                id="input"
                {...props}
                fullWidth
                select
                defaultValue={defaultValue}
                autoComplete="off"
                size="small"
                onChange={handleChange}
                value={value}
                name={name}
                style={{ minWidth: 50 }}
            >
                {children}
            </TextField>
        ) : (
            <TextField
                id="input"
                {...props}
                fullWidth
                defaultValue={defaultValue}
                autoComplete="off"
                size="small"
                onChange={handleChange}
                value={value}
                name={name}
                style={{ minWidth: 50 }}
            />
        )}
    </Grid>
);
InputField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    horizontal: PropTypes.bool
};

InputField.defaultProps = { horizontal: false };

export default InputField;
