import './loading.css';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide, Stack } from '@mui/material';
// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export function SpinnerLoader({ open }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="lg"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100px' }}>
                <div className="lds-spinner">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </Stack>
        </Dialog>
    );
}

export function FacebookLoader({ open }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100px' }}>
                <div className="lds-facebook">
                    <div />
                    <div />
                    <div />
                </div>
            </Stack>
        </Dialog>
    );
}

export function DefaultLoader({ open }) {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100px' }}>
                <div className="lds-default">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </Stack>
        </Dialog>
    );
}

SpinnerLoader.propTypes = {
    open: PropTypes.bool
};
FacebookLoader.propTypes = {
    open: PropTypes.bool
};
DefaultLoader.propTypes = {
    open: PropTypes.bool
};
