import React, { forwardRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Stack, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import { SpinnerLoader } from 'views/ui-elements/Loaders';

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function CustomDialog({ api, text, open, data, Content, SubmitBtnText, SubmitBtnColor, snackAlert, handleClose, submitAction, ...props }) {
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    return (
        <>
            <SpinnerLoader open={loading} />
            <Dialog
                // onClose={handleClose}
                open={loading ? false : open}
                keepMounted
                maxWidth="lg"
                {...props}
                // fullWidth
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title1"
                aria-describedby="alert-dialog-slide-adresse1"
            >
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mr: 2 }}>
                    <DialogTitle id="alert-dialog-slide-title1" sx={{ color: theme.palette.table.header }}>
                        {text}
                    </DialogTitle>
                    <IconButton
                        onClick={() => {
                            handleClose();
                        }}
                        sx={{
                            ':hover': {
                                cursor: 'pointer',
                                backgroundColor: theme.palette.error.light,
                                color: theme.palette.primary.light
                            }
                        }}
                    >
                        <Close />
                    </IconButton>
                </Stack>
                <DialogContent>{Content}</DialogContent>
                <DialogActions sx={{ mr: 2 }}>
                    {submitAction && (
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setLoading(true);
                                api(data)
                                    .then((res) => {
                                        setLoading(false);
                                        handleClose(data);
                                        snackAlert(res.message, 'success');
                                    })
                                    .catch((error) => {
                                        setLoading(false);
                                        snackAlert(`${error.response?.data.message ? error.response.data.message : error}`, 'error');
                                    });
                            }}
                            color={SubmitBtnColor}
                            size="small"
                            disabled={loading}
                        >
                            {SubmitBtnText}
                        </Button>
                    )}
                    <Button variant="outlined" size="small" onClick={() => handleClose()}>
                        <FormattedMessage id="cancel" />
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

CustomDialog.propTypes = {};

CustomDialog.defaultProps = {};

export default CustomDialog;
