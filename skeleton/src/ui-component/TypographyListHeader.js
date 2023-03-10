import { Typography } from '@mui/material';

function TypographyListHeader({ text, ...props }) {
    return (
        <Typography variant="h3" {...props}>
            {text}
        </Typography>
    );
}

export default TypographyListHeader;
