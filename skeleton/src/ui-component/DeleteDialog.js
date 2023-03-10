import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, useTheme } from '@mui/material';
// import * as invoiceCustomerApi from "api/invoiceCustomerApi";
import { FormattedMessage, useIntl } from 'react-intl';
import { SpinnerLoader } from 'views/ui-elements/Loaders';

function DeleteDialog({ handleClose, open, handleSubmit, btnName, title, deleting, loaderBtn }) {
    // const [loaderBtn, setLoaderBtn] = useState(false);
    const theme = useTheme();

    return (
        <>
            <Dialog onClose={handleClose} open={open} keepMounted>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'red'
                        }}
                        disabled={deleting}
                        onClick={handleSubmit}
                    >
                        {btnName}
                    </Button>
                    <Button variant="outlined" onClick={() => handleClose()}>
                        <FormattedMessage id="no" />
                    </Button>
                </DialogActions>
            </Dialog>
            <SpinnerLoader open={loaderBtn} />
        </>
    );
}

export default DeleteDialog;
