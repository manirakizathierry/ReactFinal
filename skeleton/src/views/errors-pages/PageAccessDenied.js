import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function PageAccessDenied() {
    return (
        <>
            <MainCard>
                <Grid container spacing={3}>
                    <Grid item>
                        <h2>403</h2>
                        <h3>Acces Denied</h3>
                    </Grid>
                    <Grid item>
                        <h5> Sorry, but you don&apos;t have permission to acces this page</h5>
                        <h5>You can go back to the previous page</h5>
                    </Grid>
                    <Grid item>Image</Grid>
                </Grid>
            </MainCard>
        </>
    );
}

export default PageAccessDenied;
