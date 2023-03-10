import React from 'react';
import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const AutocompleteComponent = ({
    label,
    handleChange,
    name,
    defaultValue,
    style,
    error,
    helperText,
    labelStyles,
    horizontal,
    value,
    options,
    gridProps,
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
        <Autocomplete
            {...props}
            fullWidth
            name={name}
            size="small"
            value={value}
            autoHighlight
            clearOnEscape
            options={options}
            onChange={handleChange}
            style={{ minWidth: 50 }}
            defaultValue={defaultValue}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText={<FormattedMessage id="no-options" />}
            renderInput={(params) => <TextField size="small" error={error} helperText={helperText} {...params} />}
        />
    </Grid>
);

AutocompleteComponent.propTypes = {
    handleChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.object,
    horizontal: PropTypes.bool
};

AutocompleteComponent.defaultProps = {
    defaultValue: null,
    horizontal: false
};

export default AutocompleteComponent;
