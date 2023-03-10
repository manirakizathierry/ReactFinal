import React from 'react';

// material-ui
import { Select, MenuItem, FormHelperText, Typography, Grid } from '@mui/material';
import { PlaceSharp } from '@mui/icons-material';
import PropTypes from 'prop-types';

function SelectComponent({
    label,
    options = [],
    handleChange,
    name,
    error,
    value,
    style,
    handleOpen,
    handleClose,
    placeholder,
    labelStyles,
    helperText,
    none,
    gridProps,
    ...props
}) {
    return (
        // <div
        //     style={{
        //         display: 'flex',
        //         flexDirection: 'column',
        //         marginTop: 3,
        //         // minWidth: 150,
        //         marginBottom: 3,
        //         // maxWidth: 300,
        //         ...style
        //     }}
        // >// </div>
        <Grid item direction="column" style={{ ...style }} {...gridProps}>
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
            <Select
                id={label}
                name={name}
                size="small"
                onChange={handleChange}
                value={value}
                fullWidth
                onOpen={handleOpen}
                onClose={handleClose}
                displayEmpty
                {...props}
            >
                {none && (
                    <MenuItem value="" style={{ color: 'red' }}>
                        <em style={{ color: 'grey' }}>{none}</em>
                    </MenuItem>
                )}
                {placeholder && (
                    <MenuItem value="" disabled style={{ color: 'red' }}>
                        <em style={{ color: 'grey' }}>{placeholder}</em>
                    </MenuItem>
                )}
                {options.map((option, index) => (
                    <MenuItem value={option.value} key={index}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {(error || helperText) && (
                <FormHelperText error={error} id="standard-weight-helper-text-email-login">
                    {error || helperText}
                </FormHelperText>
            )}
        </Grid>
    );
}

SelectComponent.propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default SelectComponent;
