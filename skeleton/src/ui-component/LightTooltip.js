import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11
    }
}));

function LightTooltip({ children, placement, title, sx, ...props }) {
    return (
        <StyledTooltip placement={placement} title={title} sx={{ ...sx }} {...props}>
            {children}
        </StyledTooltip>
    );
}

export default LightTooltip;

LightTooltip.propTypes = {
    children: PropTypes.node,
    placement: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};
