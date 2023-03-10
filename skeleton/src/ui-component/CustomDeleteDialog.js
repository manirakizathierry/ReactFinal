import React, { forwardRef, useState } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Slide } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { SpinnerLoader } from 'views/ui-elements/Loaders';
import { useTheme } from '@mui/material/styles';

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function CustomDeleteDialog({ text, handleClose, open, toDelete, api, snackAlert }) {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        console.log('to delete', toDelete?.id);
        setLoading(true);
        api(toDelete?.id)
            .then((res) => {
                setLoading(false);
                handleClose(toDelete);
                snackAlert(res.message, 'success');
            })

            .catch((error) => {
                setLoading(false);
                snackAlert(`${error.response?.data.message ? error.response.data.message : error}`, 'error');
            });
    };
    return (
        <React.Fragment key="container">
            <Dialog keepMounted open={open} maxWidth="md" TransitionComponent={Transition}>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    <FormattedMessage id="delete-alert" /> {text} ?
                </DialogTitle>
                <DialogActions>
                    <Button size="small" color="primary" variant="contained" onClick={handleClick} disabled={loading}>
                        <FormattedMessage id="yes" />
                    </Button>
                    <Button
                        variant="contained"
                        style={{ background: theme.palette.error.light }}
                        size="small"
                        onClick={() => handleClose()}
                    >
                        <FormattedMessage id="no" />
                    </Button>
                </DialogActions>
            </Dialog>
            <SpinnerLoader open={loading} />
        </React.Fragment>
    );
}

CustomDeleteDialog.propTypes = {};
CustomDeleteDialog.defaultProps = {};

export default CustomDeleteDialog;
