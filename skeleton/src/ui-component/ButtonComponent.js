import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

function getContrastText(hexcolor) {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'black' : 'white';
}

const StyledButton = styled(Button)(({ theme }) => ({
    color: getContrastText(theme.palette.secondary[200]),
    background: theme.palette.secondary[200],
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff'
    }
}));

const ButtonComponent = ({ text, style, handleClick, variant, type, endIcon, startIcon, disabled, refresh, ...props }) =>
    refresh ? (
        <StyledButton
            variant={variant}
            {...props}
            size="small"
            endIcon={endIcon}
            startIcon={startIcon}
            disabled={disabled}
            type={type}
            style={{
                cursor: 'pointer',
                paddingLeft: 30,
                paddingRight: 30,
                textTransform: 'none',
                ...style
            }}
            onClick={handleClick}
            sx={
                {
                    //    "&:hover": {
                    //      backgroundColor: "green",
                    //    },
                }
            }
        >
            {text}
        </StyledButton>
    ) : (
        <Button
            variant={variant}
            {...props}
            size="small"
            endIcon={endIcon}
            startIcon={startIcon}
            disabled={disabled}
            type={type}
            style={{
                cursor: 'pointer',
                paddingLeft: 30,
                paddingRight: 30,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                ...style
            }}
            onClick={handleClick}
            sx={{
                '&:hover': {
                    // backgroundColor: 'green'
                    cursor: 'pointer'
                }
            }}
        >
            {text}
        </Button>
    );

ButtonComponent.propTypes = {
    type: PropTypes.string,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    endIcon: PropTypes.element,
    startIcon: PropTypes.element,
    handleClick: PropTypes.func.isRequired,
    text: PropTypes.node.isRequired,
    refresh: PropTypes.bool
};

ButtonComponent.defaultProps = {
    refresh: false
};

export default ButtonComponent;
